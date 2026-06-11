import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default || traverseModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const defaultInputDir = path.join(repoRoot, "kubejs");
const defaultWorkDir = path.join(__dirname, ".kubejs-work");
const defaultManifestPath = path.join(defaultWorkDir, "manifest.json");
const defaultPayloadPath = path.join(defaultWorkDir, "payload.json");
const defaultTranslationsPath = path.join(defaultWorkDir, "translations.json");
const defaultReportPath = path.join(defaultWorkDir, "report.json");
const defaultLangOutputPath = path.join(repoRoot, "assets", "kubejs", "lang", "en_us.json");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i <= 0) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

function parseArgs(argv) {
  const out = {
    command: "roundtrip",
    inputDir: defaultInputDir,
    workDir: defaultWorkDir,
    manifestPath: defaultManifestPath,
    payloadPath: defaultPayloadPath,
    translationsPath: defaultTranslationsPath,
    reportPath: defaultReportPath,
    langOutputPath: defaultLangOutputPath,
    mergeLang: true,
    batchSize: Number(process.env.DEEPSEEK_BATCH_SIZE || 80),
    temperature: Number(process.env.DEEPSEEK_TEMPERATURE || 0.2),
    maxRetry: Number(process.env.DEEPSEEK_MAX_RETRY || 2),
    dryRun: false,
    force: false,
  };
  const provided = {
    manifest: false,
    payload: false,
    translations: false,
    report: false,
  };

  let index = 0;
  if (argv[0] && !argv[0].startsWith("--")) {
    out.command = argv[0];
    index = 1;
  }

  for (let i = index; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input") out.inputDir = argv[++i] || out.inputDir;
    else if (a === "--work-dir") out.workDir = argv[++i] || out.workDir;
    else if (a === "--manifest") {
      out.manifestPath = argv[++i] || out.manifestPath;
      provided.manifest = true;
    } else if (a === "--payload") {
      out.payloadPath = argv[++i] || out.payloadPath;
      provided.payload = true;
    } else if (a === "--translations") {
      out.translationsPath = argv[++i] || out.translationsPath;
      provided.translations = true;
    } else if (a === "--report") {
      out.reportPath = argv[++i] || out.reportPath;
      provided.report = true;
    } else if (a === "--lang-output") out.langOutputPath = argv[++i] || out.langOutputPath;
    else if (a === "--no-merge-lang") out.mergeLang = false;
    else if (a === "--batch-size") out.batchSize = Number(argv[++i] || out.batchSize);
    else if (a === "--temperature") out.temperature = Number(argv[++i] || out.temperature);
    else if (a === "--max-retry") out.maxRetry = Number(argv[++i] || out.maxRetry);
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
  }

  if (!["extract", "translate", "apply", "roundtrip", "extract-keys", "sync-lang", "rewrite-keys"].includes(out.command)) {
    throw new Error("command must be one of: extract, translate, apply, roundtrip, extract-keys, sync-lang, rewrite-keys");
  }
  if (!Number.isFinite(out.batchSize) || out.batchSize <= 0) {
    throw new Error("--batch-size must be a positive number");
  }
  if (!Number.isFinite(out.temperature) || out.temperature < 0 || out.temperature > 2) {
    throw new Error("--temperature must be a number between 0 and 2");
  }
  if (!Number.isFinite(out.maxRetry) || out.maxRetry < 1 || out.maxRetry > 10) {
    throw new Error("--max-retry must be a number between 1 and 10");
  }

  out.inputDir = path.resolve(out.inputDir);
  out.workDir = path.resolve(out.workDir);
  out.manifestPath = path.resolve(provided.manifest ? out.manifestPath : path.join(out.workDir, "manifest.json"));
  out.payloadPath = path.resolve(provided.payload ? out.payloadPath : path.join(out.workDir, "payload.json"));
  out.translationsPath = path.resolve(provided.translations ? out.translationsPath : path.join(out.workDir, "translations.json"));
  out.reportPath = path.resolve(provided.report ? out.reportPath : path.join(out.workDir, "report.json"));
  out.langOutputPath = path.resolve(out.langOutputPath);

  return out;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeJson(filePath, value) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function walkFiles(dirPath, out = []) {
  if (!fs.existsSync(dirPath)) return out;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const child = path.join(dirPath, entry.name);
    if (entry.isDirectory()) walkFiles(child, out);
    else if (entry.isFile() && child.toLowerCase().endsWith(".js")) out.push(child);
  }
  return out;
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativePosixPath(fromDir, filePath) {
  return toPosixPath(path.relative(fromDir, filePath));
}

function buildLineIndex(source) {
  const starts = [0];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "\n") starts.push(i + 1);
  }
  return starts;
}

function offsetToLineColumn(offset, lineStarts) {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (lineStarts[mid] <= offset) low = mid + 1;
    else high = mid - 1;
  }
  const lineIndex = Math.max(0, high);
  return { line: lineIndex + 1, column: offset - lineStarts[lineIndex] + 1 };
}

function getCalleeName(node) {
  if (!node) return null;
  if (node.type === "Identifier") return node.name;
  if (node.type === "MemberExpression" && !node.computed) {
    const objectName = getCalleeName(node.object);
    const propertyName = getCalleeName(node.property);
    if (!objectName || !propertyName) return null;
    return `${objectName}.${propertyName}`;
  }
  return null;
}

function getPropertyKeyName(node) {
  if (!node) return null;
  if (node.type === "Identifier") return node.name;
  if (node.type === "StringLiteral") return node.value;
  return null;
}

function hasLatinLetters(text) {
  return /[A-Za-z]/.test(String(text));
}

function looksLikeResourceLocation(text) {
  return /^[a-z0-9_.-]+:[a-z0-9_./-]+$/i.test(String(text).trim());
}

function normalizeFileForKey(file) {
  return String(file)
    .replace(/\.js$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/\.+/g, ".")
    .replace(/^\.|\.$/g, "");
}

function makeTranslationKey(file, index) {
  const normalized = normalizeFileForKey(file);
  return `kubejs.script.${normalized}.${String(index).padStart(4, "0")}`;
}

function isStringLiteral(node) {
  return node && node.type === "StringLiteral";
}

function isStaticTemplateLiteral(node) {
  return node && node.type === "TemplateLiteral" && Array.isArray(node.expressions) && node.expressions.length === 0 && node.quasis.length === 1;
}

function getStaticStringNodeValue(node) {
  if (isStringLiteral(node)) return node.value;
  if (isStaticTemplateLiteral(node)) return node.quasis[0]?.value?.cooked ?? null;
  return null;
}

function templateLiteralToFormatString(node) {
  if (!node || node.type !== "TemplateLiteral") return null;
  const quasis = Array.isArray(node.quasis) ? node.quasis : [];
  const expressions = Array.isArray(node.expressions) ? node.expressions : [];
  if (quasis.length === 0 || quasis.length !== expressions.length + 1) return null;

  let value = "";
  for (let i = 0; i < quasis.length; i++) {
    const cooked = quasis[i]?.value?.cooked ?? "";
    value += String(cooked).replace(/%/g, "%%");
    if (i < expressions.length) value += "%s";
  }
  return { value, expressionCount: expressions.length };
}

function extractIdentifierNames(node, out = new Set()) {
  if (!node || typeof node !== "object") return out;
  if (node.type === "Identifier") {
    out.add(node.name);
    return out;
  }
  for (const key of Object.keys(node)) {
    if (key === "loc") continue;
    const value = node[key];
    if (!value) continue;
    if (Array.isArray(value)) {
      for (const item of value) extractIdentifierNames(item, out);
    } else if (typeof value === "object" && value.type) {
      extractIdentifierNames(value, out);
    }
  }
  return out;
}

function referencesAnyIdentifier(node, namesSet) {
  if (!node || !namesSet || namesSet.size === 0) return false;
  const names = extractIdentifierNames(node);
  for (const name of names) {
    if (namesSet.has(name)) return true;
  }
  return false;
}

function shouldTranslateText(value) {
  const text = String(value);
  if (!text.trim()) return false;
  if (looksLikeResourceLocation(text)) return false;
  return hasLatinLetters(text);
}

function extractStringEntry({ source, file, lineStarts, start, end, value, kind, sequence, objectName, propertyKey }) {
  const raw = source.slice(start, end);
  if (!shouldTranslateText(value)) return null;
  const loc = offsetToLineColumn(start, lineStarts);
  const id = `${file}::${loc.line}:${loc.column}::${sequence}`;
  const key = makeTranslationKey(file, sequence);
  const quote = raw[0] === "'" || raw[0] === '"' ? raw[0] : '"';
  return {
    id,
    key,
    file,
    kind,
    start,
    end,
    line: loc.line,
    column: loc.column,
    raw,
    value,
    quote,
    objectName: objectName || null,
    propertyKey: propertyKey || null,
  };
}

function extractFromFile(filePath, inputDir) {
  const source = fs.readFileSync(filePath, "utf8");
  const lineStarts = buildLineIndex(source);
  const ast = parse(source, {
    sourceType: "unambiguous",
    plugins: ["topLevelAwait", "jsx"],
  });

  const relativeFile = relativePosixPath(inputDir, filePath);
  const entries = [];
  const skipped = [];
  const rewrites = [];
  const keyObjectNames = new Set();
  const seenRewriteSpans = new Set();
  let sequence = 0;

  function pushEntry(node, kind, metadata = {}) {
    const value = getStaticStringNodeValue(node);
    if (value == null) return;
    const entry = extractStringEntry({
      source,
      file: relativeFile,
      lineStarts,
      start: node.start,
      end: node.end,
      value,
      kind,
      sequence: ++sequence,
      objectName: metadata.objectName,
      propertyKey: metadata.propertyKey,
    });
    if (entry) {
      entries.push(entry);
      return entry;
    }
    return null;
  }

  function recordSkipped(node, kind, reason) {
    if (!node) return;
    skipped.push({
      file: relativeFile,
      kind,
      reason,
      start: node.start,
      end: node.end,
    });
  }

  function registerTextTranslateRewrite(callNode) {
    if (!callNode || !callNode.callee) return;
    const start = callNode.callee.start;
    const end = callNode.callee.end;
    if (start == null || end == null || end <= start) return;
    const raw = source.slice(start, end);
    if (raw !== "Text.of") return;
    const key = `${start}:${end}`;
    if (seenRewriteSpans.has(key)) return;
    rewrites.push({
      file: relativeFile,
      start,
      end,
      raw,
      replaceWith: "Text.translate",
      kind: "callee.Text.of",
    });
    seenRewriteSpans.add(key);
  }

  function pushTemplateEntry(node, kind, metadata = {}) {
    const templateInfo = templateLiteralToFormatString(node);
    if (!templateInfo || templateInfo.expressionCount <= 0) return null;
    const entry = extractStringEntry({
      source,
      file: relativeFile,
      lineStarts,
      start: node.start,
      end: node.end,
      value: templateInfo.value,
      kind,
      sequence: ++sequence,
      objectName: metadata.objectName,
      propertyKey: metadata.propertyKey,
    });
    if (!entry) return null;
    entry.skipLiteralRewrite = true;
    entries.push(entry);
    return entry;
  }

  function registerTemplateArgRewrite(callNode, argNode, entry) {
    if (!callNode || !argNode || !entry) return;
    if (argNode.type !== "TemplateLiteral" || !Array.isArray(argNode.expressions) || argNode.expressions.length === 0) return;
    const exprSources = argNode.expressions
      .map((expr) => source.slice(expr.start, expr.end).trim())
      .filter((s) => s.length > 0);
    const keyLiteral = quoteJsString(entry.key, entry.quote || '"');
    const replaceWith = exprSources.length > 0 ? `${keyLiteral}, ${exprSources.join(", ")}` : keyLiteral;
    rewrites.push({
      file: relativeFile,
      start: argNode.start,
      end: argNode.end,
      raw: source.slice(argNode.start, argNode.end),
      replaceWith,
      kind: "Text.of.template.args",
    });
  }

  traverse(ast, {
    CallExpression(pathNode) {
      const callee = getCalleeName(pathNode.node.callee);
      if (callee === "Text.of") {
        const arg = pathNode.node.arguments[0];
        if (!arg) return;
        const staticValue = getStaticStringNodeValue(arg);
        if (staticValue != null) {
          const entry = pushEntry(arg, callee);
          if (entry) registerTextTranslateRewrite(pathNode.node);
        } else if (arg.type === "TemplateLiteral" && Array.isArray(arg.expressions) && arg.expressions.length > 0) {
          const entry = pushTemplateEntry(arg, "Text.of.template");
          if (entry) {
            registerTextTranslateRewrite(pathNode.node);
            registerTemplateArgRewrite(pathNode.node, arg, entry);
          } else {
            recordSkipped(arg, "Text.of.template", "template had no translatable text");
          }
        } else if (
          arg.type === "LogicalExpression" &&
          referencesAnyIdentifier(arg.left, keyObjectNames) &&
          getStaticStringNodeValue(arg.right) != null
        ) {
          const entry = pushEntry(arg.right, "Text.of.fallback");
          if (entry) registerTextTranslateRewrite(pathNode.node);
        } else if (referencesAnyIdentifier(arg, keyObjectNames)) {
          registerTextTranslateRewrite(pathNode.node);
        } else {
          recordSkipped(arg, callee, "unsupported Text.of argument");
        }
        return;
      }

      if (callee === "event.add") {
        const arg = pathNode.node.arguments[1];
        if (getStaticStringNodeValue(arg) != null) pushEntry(arg, callee);
        else if (arg) recordSkipped(arg, callee, "unsupported event.add value");
        return;
      }

      if (callee === "event.addItem") {
        const arg = pathNode.node.arguments[1];
        if (getStaticStringNodeValue(arg) != null) {
          pushEntry(arg, callee);
          return;
        }
        if (arg && arg.type === "ArrayExpression") {
          for (const element of arg.elements) {
            if (getStaticStringNodeValue(element) != null) pushEntry(element, `${callee}.array`);
          }
          return;
        }
        if (arg) recordSkipped(arg, callee, "unsupported event.addItem payload");
      }
    },
    ObjectProperty(pathNode) {
      const keyName = getPropertyKeyName(pathNode.node.key);
      if (keyName === "lore") {
        const valueNode = pathNode.node.value;
        if (getStaticStringNodeValue(valueNode) != null) {
          pushEntry(valueNode, "object.lore");
        } else if (valueNode) {
          recordSkipped(valueNode, "object.lore", "unsupported lore value");
        }
        return;
      }

      if (keyName === "mechanics" || keyName === "machanics") {
        const valueNode = pathNode.node.value;
        if (valueNode && valueNode.type === "ArrayExpression") {
          for (const element of valueNode.elements) {
            if (getStaticStringNodeValue(element) != null) {
              pushEntry(element, "object.mechanics");
            }
          }
        } else if (valueNode) {
          recordSkipped(valueNode, "object.mechanics", "unsupported mechanics value");
        }
        return;
      }

      const objectExprPath = pathNode.parentPath;
      const varDeclPath = objectExprPath?.parentPath;
      if (
        objectExprPath?.node?.type === "ObjectExpression" &&
        varDeclPath?.node?.type === "VariableDeclarator" &&
        varDeclPath?.parentPath?.node?.kind === "const"
      ) {
        const valueNode = pathNode.node.value;
        const objectName = varDeclPath.node.id?.type === "Identifier" ? varDeclPath.node.id.name : null;
        const propertyKey = getPropertyKeyName(pathNode.node.key);
        if (getStaticStringNodeValue(valueNode) != null) {
          const entry = pushEntry(valueNode, "const.object.value", { objectName, propertyKey });
          if (entry && objectName) keyObjectNames.add(objectName);
        }
      }
    },
  });

  return { file: relativeFile, entries, skipped, rewrites };
}

function tryParseJsonObject(text) {
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
  } catch {
    // ignore
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const maybe = text.slice(start, end + 1);
    try {
      const parsed = JSON.parse(maybe);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
    } catch {
      // ignore
    }
  }
  throw new Error("DeepSeek response is not a valid JSON object.");
}

function unwrapCommonContainer(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return obj;
  const candidates = ["translations", "result", "data", "output"];
  for (const key of candidates) {
    const value = obj[key];
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
  }
  return obj;
}

function extractPlaceholders(value) {
  return String(value).match(/%(?:\d+\$)?[sdif]/g) || [];
}

function extractSectionCodes(value) {
  return String(value).match(/§[0-9A-FK-ORa-fk-or]/g) || [];
}

function sameMultiset(a, b) {
  if (a.length !== b.length) return false;
  const counts = new Map();
  for (const item of a) counts.set(item, (counts.get(item) || 0) + 1);
  for (const item of b) {
    const next = counts.get(item) || 0;
    if (next <= 0) return false;
    counts.set(item, next - 1);
  }
  return [...counts.values()].every((v) => v === 0);
}

function buildMessages(glossary, payloadObj) {
  const system = [
    "你是 Minecraft 1.20.1 的 KubeJS 脚本文案译者，目标语言为简体中文。",
    "你必须严格返回 JSON 对象，不要返回任何额外文字。",
    "你必须保持输入 key 完全不变。",
    "你必须保留并原样输出所有占位符与格式标记：%s / %1$s / %d / %f / § 代码 / \\n。",
    "不要删除 key，不要新增 key。",
    "翻译自然、简洁、符合游戏 UI 语境。",
  ].join("\n");

  const user = [
    "术语和风格要求如下：",
    JSON.stringify(glossary, null, 2),
    "\n请翻译下面这个 JSON 对象的所有 value：",
    JSON.stringify(payloadObj, null, 2),
  ].join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

async function deepseekTranslateBatch({ apiBase, apiKey, model, temperature, glossary, batchObj }) {
  const base = apiBase.replace(/\/+$/, "");
  const url = base.endsWith("/v1") ? `${base}/chat/completions` : `${base}/v1/chat/completions`;

  const body = {
    model,
    temperature,
    response_format: { type: "json_object" },
    messages: buildMessages(glossary, batchObj),
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`DeepSeek API error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek API returned empty content.");

  return tryParseJsonObject(content);
}

function validateAndMergeBatch(sourceBatchObj, translatedObj, resultObj, entryMap, skippedFallbacks) {
  const sourceKeys = Object.keys(sourceBatchObj);
  const translatedKeys = Object.keys(translatedObj);
  const sourceSet = new Set(sourceKeys);
  const translatedSet = new Set(translatedKeys);

  if (sourceSet.size !== translatedSet.size || sourceKeys.some((key) => !translatedSet.has(key))) {
    const missing = sourceKeys.filter((key) => !translatedSet.has(key));
    const extra = translatedKeys.filter((key) => !sourceSet.has(key));
    const err = new Error(`Returned keys mismatch for batch. missing=${missing.length} extra=${extra.length}`);
    err.code = "KEY_MISMATCH";
    err.missing = missing;
    err.extra = extra;
    throw err;
  }

  let accepted = 0;
  let fallback = 0;

  for (const key of sourceKeys) {
    const source = String(sourceBatchObj[key]);
    const candidate = String(translatedObj[key]);
    const srcPlaceholders = extractPlaceholders(source);
    const outPlaceholders = extractPlaceholders(candidate);
    const srcCodes = extractSectionCodes(source);
    const outCodes = extractSectionCodes(candidate);
    const ok = sameMultiset(srcPlaceholders, outPlaceholders) && sameMultiset(srcCodes, outCodes);
    if (ok) {
      resultObj[key] = candidate;
      accepted++;
    } else {
      resultObj[key] = source;
      skippedFallbacks.push({ id: key, reason: "placeholder or section-code validation failed" });
      fallback++;
      const entry = entryMap.get(key);
      if (entry) entry.validationFailed = true;
    }
  }

  return { accepted, fallback };
}

async function translateWithRetryAndSplit({
  entries,
  sourceObj,
  translatedObj,
  entryMap,
  skippedFallbacks,
  apiBase,
  apiKey,
  model,
  temperature,
  glossary,
  maxRetry,
}) {
  const batchObj = Object.fromEntries(entries.map((entry) => [entry.id, sourceObj[entry.id]]));

  for (let attempt = 1; attempt <= maxRetry; attempt++) {
    try {
      const raw = await deepseekTranslateBatch({
        apiBase,
        apiKey,
        model,
        temperature,
        glossary,
        batchObj,
      });
      const parsed = unwrapCommonContainer(raw);
      return validateAndMergeBatch(batchObj, parsed, translatedObj, entryMap, skippedFallbacks);
    } catch (err) {
      const retryable = err?.code === "KEY_MISMATCH";
      if (!retryable || attempt === maxRetry) {
        if (entries.length > 1) {
          const mid = Math.floor(entries.length / 2);
          const left = await translateWithRetryAndSplit({
            entries: entries.slice(0, mid),
            sourceObj,
            translatedObj,
            entryMap,
            skippedFallbacks,
            apiBase,
            apiKey,
            model,
            temperature,
            glossary,
            maxRetry,
          });
          const right = await translateWithRetryAndSplit({
            entries: entries.slice(mid),
            sourceObj,
            translatedObj,
            entryMap,
            skippedFallbacks,
            apiBase,
            apiKey,
            model,
            temperature,
            glossary,
            maxRetry,
          });
          return {
            accepted: left.accepted + right.accepted,
            fallback: left.fallback + right.fallback,
          };
        }

        const single = entries[0];
        translatedObj[single.id] = sourceObj[single.id];
        skippedFallbacks.push({ id: single.id, reason: retryable ? "repeated key mismatch" : String(err?.message || err) });
        const entry = entryMap.get(single.id);
        if (entry) entry.translationFailed = true;
        return { accepted: 0, fallback: 1 };
      }
    }
  }

  return { accepted: 0, fallback: 0 };
}

function splitBatches(entries, size) {
  const batches = [];
  for (let i = 0; i < entries.length; i += size) {
    batches.push(entries.slice(i, i + size));
  }
  return batches;
}

function quoteJsString(value, quoteChar) {
  const escaped = String(value)
    .replace(/\\/g, "\\\\")
    .replace(new RegExp(quoteChar, "g"), `\\${quoteChar}`)
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return `${quoteChar}${escaped}${quoteChar}`;
}

function sortObjectKeys(obj) {
  const out = {};
  for (const key of Object.keys(obj).sort()) {
    out[key] = obj[key];
  }
  return out;
}

function buildKeyPayload(manifest) {
  const payload = {};
  for (const entry of manifest.entries || []) {
    payload[entry.key] = entry.value;
  }
  return sortObjectKeys(payload);
}

function syncLangFile({ payloadPath, langOutputPath, mergeLang, dryRun }) {
  const payload = readJson(payloadPath);
  const incoming = sortObjectKeys(payload);
  const exists = fs.existsSync(langOutputPath);
  const previous = exists ? readJson(langOutputPath) : {};
  const next = mergeLang ? sortObjectKeys({ ...previous, ...incoming }) : incoming;

  let added = 0;
  let updated = 0;
  let unchanged = 0;

  for (const [key, value] of Object.entries(incoming)) {
    if (!(key in previous)) added++;
    else if (previous[key] !== value) updated++;
    else unchanged++;
  }

  if (!dryRun) writeJson(langOutputPath, next);
  return {
    langOutputPath,
    exists,
    mergeLang,
    incoming: Object.keys(incoming).length,
    total: Object.keys(next).length,
    added,
    updated,
    unchanged,
    dryRun,
  };
}

function applyTranslationsToSource(source, fileEntries, translations) {
  const sorted = [...fileEntries].sort((a, b) => b.start - a.start);
  let result = source;
  const problems = [];

  for (const entry of sorted) {
    const translated = translations[entry.id];
    if (typeof translated !== "string") {
      problems.push({ id: entry.id, reason: "missing translation" });
      continue;
    }

    const current = result.slice(entry.start, entry.end);
    if (current !== entry.raw) {
      problems.push({ id: entry.id, reason: "source span changed" });
      continue;
    }

    const next = quoteJsString(translated, entry.quote);
    result = `${result.slice(0, entry.start)}${next}${result.slice(entry.end)}`;
  }

  return { result, problems };
}

async function extractStage(inputDir, manifestPath, payloadPath, reportPath) {
  const files = walkFiles(inputDir);
  const manifest = {
    version: 1,
    inputDir,
    generatedAt: new Date().toISOString(),
    files: [],
    entries: [],
    rewrites: [],
  };
  const payload = {};
  const report = { files: [], skipped: [] };

  for (const filePath of files) {
    const { file, entries, skipped, rewrites } = extractFromFile(filePath, inputDir);
    if (entries.length === 0 && skipped.length === 0 && rewrites.length === 0) continue;

    manifest.files.push({ file, entryCount: entries.length, skippedCount: skipped.length, rewriteCount: rewrites.length });
    for (const entry of entries) {
      manifest.entries.push(entry);
      payload[entry.id] = entry.value;
    }
    for (const rewrite of rewrites) manifest.rewrites.push(rewrite);
    for (const item of skipped) report.skipped.push(item);
    report.files.push({ file, entryCount: entries.length, skippedCount: skipped.length, rewriteCount: rewrites.length });
  }

  writeJson(manifestPath, manifest);
  writeJson(payloadPath, payload);
  writeJson(reportPath, report);

  console.log(`[extract] files=${manifest.files.length} entries=${manifest.entries.length} skipped=${report.skipped.length}`);
  console.log(`[extract] manifest=${manifestPath}`);
  console.log(`[extract] payload=${payloadPath}`);
  console.log(`[extract] report=${reportPath}`);

  return { manifest, payload, report };
}

async function extractKeysStage(inputDir, manifestPath, payloadPath, reportPath) {
  const { manifest, report } = await extractStage(inputDir, manifestPath, path.join(path.dirname(payloadPath), "__legacy_payload.tmp.json"), reportPath);

  const keyPayload = buildKeyPayload(manifest);
  writeJson(payloadPath, keyPayload);

  const tmpLegacy = path.join(path.dirname(payloadPath), "__legacy_payload.tmp.json");
  if (fs.existsSync(tmpLegacy)) fs.unlinkSync(tmpLegacy);

  console.log(`[extract-keys] files=${manifest.files.length} entries=${manifest.entries.length} rewrites=${manifest.rewrites.length}`);
  console.log(`[extract-keys] payload=${payloadPath}`);
  return { manifest, payload: keyPayload, report };
}

async function translateStage(manifestPath, payloadPath, translationsPath, reportPath, options) {
  const manifest = readJson(manifestPath);
  const payload = fs.existsSync(payloadPath) ? readJson(payloadPath) : Object.fromEntries(manifest.entries.map((entry) => [entry.id, entry.value]));
  const glossaryPath = path.join(__dirname, "glossary.json");
  const glossary = fs.existsSync(glossaryPath) ? readJson(glossaryPath) : {};

  const entries = manifest.entries.filter((entry) => payload[entry.id] !== undefined);
  const translations = {};
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]));
  const skippedFallbacks = [];

  if (entries.length === 0) {
    writeJson(translationsPath, translations);
    writeJson(reportPath, { message: "No entries to translate", skippedFallbacks });
    console.log("[translate] no entries to translate");
    return { translations, skippedFallbacks };
  }

  const batches = splitBatches(entries, options.batchSize);
  let accepted = 0;
  let fallback = 0;

  for (let index = 0; index < batches.length; index++) {
    const batch = batches[index];
    console.log(`[translate] batch ${index + 1}/${batches.length} (${batch.length} entries)`);
    const stat = await translateWithRetryAndSplit({
      entries: batch,
      sourceObj: payload,
      translatedObj: translations,
      entryMap,
      skippedFallbacks,
      apiBase: process.env.DEEPSEEK_API_BASE || "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: options.temperature,
      glossary,
      maxRetry: options.maxRetry,
    });
    accepted += stat.accepted;
    fallback += stat.fallback;
  }

  writeJson(translationsPath, translations);
  writeJson(reportPath, {
    accepted,
    fallback,
    skippedFallbacks,
    translatedEntries: Object.keys(translations).length,
  });
  console.log(`[translate] accepted=${accepted} fallback=${fallback}`);
  console.log(`[translate] translations=${translationsPath}`);
  console.log(`[translate] report=${reportPath}`);

  return { translations, skippedFallbacks };
}

async function applyStage(manifestPath, translationsPath, inputDir, dryRun) {
  const manifest = readJson(manifestPath);
  const translations = readJson(translationsPath);
  const byFile = new Map();

  for (const entry of manifest.entries) {
    if (!byFile.has(entry.file)) byFile.set(entry.file, []);
    byFile.get(entry.file).push(entry);
  }

  const results = [];
  for (const [relativeFile, entries] of byFile) {
    const filePath = path.join(inputDir, relativeFile);
    const source = fs.readFileSync(filePath, "utf8");
    const { result, problems } = applyTranslationsToSource(source, entries, translations);
    if (!dryRun && result !== source) {
      fs.writeFileSync(filePath, result, "utf8");
      console.log(`[apply] wrote ${relativeFile}`);
    } else if (dryRun) {
      console.log(`[apply] dry-run ${relativeFile} changed=${result !== source}`);
    }
    results.push({ file: relativeFile, changed: result !== source, problems });
  }

  return results;
}

function applyKeyRewritesToSource(source, fileEntries, fileRewrites) {
  const patches = [];

  for (const entry of fileEntries) {
    if (entry.skipLiteralRewrite) continue;
    const keyValue = quoteJsString(entry.key, entry.quote || '"');
    patches.push({
      start: entry.start,
      end: entry.end,
      expected: entry.raw,
      replaceWith: keyValue,
      id: entry.id,
      kind: "entry.key",
    });
  }

  for (const rewrite of fileRewrites) {
    patches.push({
      start: rewrite.start,
      end: rewrite.end,
      expected: rewrite.raw,
      replaceWith: rewrite.replaceWith,
      id: `${rewrite.file}:${rewrite.start}:${rewrite.end}`,
      kind: rewrite.kind || "rewrite",
    });
  }

  patches.sort((a, b) => b.start - a.start);

  let result = source;
  const problems = [];
  for (const patch of patches) {
    const current = result.slice(patch.start, patch.end);
    if (current !== patch.expected) {
      problems.push({ id: patch.id, kind: patch.kind, reason: "source span changed" });
      continue;
    }
    result = `${result.slice(0, patch.start)}${patch.replaceWith}${result.slice(patch.end)}`;
  }

  return { result, problems, patchCount: patches.length };
}

async function rewriteKeysStage(manifestPath, inputDir, dryRun, reportPath) {
  const manifest = readJson(manifestPath);
  const byFileEntries = new Map();
  const byFileRewrites = new Map();

  for (const entry of manifest.entries || []) {
    if (!byFileEntries.has(entry.file)) byFileEntries.set(entry.file, []);
    byFileEntries.get(entry.file).push(entry);
  }
  for (const rewrite of manifest.rewrites || []) {
    if (!byFileRewrites.has(rewrite.file)) byFileRewrites.set(rewrite.file, []);
    byFileRewrites.get(rewrite.file).push(rewrite);
  }

  const files = new Set([...byFileEntries.keys(), ...byFileRewrites.keys()]);
  const results = [];

  for (const relativeFile of files) {
    const filePath = path.join(inputDir, relativeFile);
    if (!fs.existsSync(filePath)) {
      results.push({ file: relativeFile, changed: false, problems: [{ reason: "file missing" }], patchCount: 0 });
      continue;
    }
    const source = fs.readFileSync(filePath, "utf8");
    const { result, problems, patchCount } = applyKeyRewritesToSource(
      source,
      byFileEntries.get(relativeFile) || [],
      byFileRewrites.get(relativeFile) || []
    );

    const changed = result !== source;
    if (!dryRun && changed) fs.writeFileSync(filePath, result, "utf8");
    results.push({ file: relativeFile, changed, problems, patchCount });
  }

  const summary = {
    command: "rewrite-keys",
    changedFiles: results.filter((r) => r.changed).length,
    totalFiles: results.length,
    problems: results.reduce((sum, r) => sum + (r.problems?.length || 0), 0),
    dryRun,
    files: results,
  };
  writeJson(reportPath, summary);
  console.log(`[rewrite-keys] files=${summary.totalFiles} changed=${summary.changedFiles} problems=${summary.problems}`);
  console.log(`[rewrite-keys] report=${reportPath}`);
  return summary;
}

async function main() {
  loadDotEnv(path.join(__dirname, ".env"));
  const args = parseArgs(process.argv.slice(2));

  if (!["extract", "extract-keys", "sync-lang", "rewrite-keys"].includes(args.command) && !process.env.DEEPSEEK_API_KEY) {
    throw new Error("DEEPSEEK_API_KEY is missing. Set it in deepseek-i18n/.env or shell env.");
  }

  fs.mkdirSync(args.workDir, { recursive: true });

  if (args.command === "extract") {
    await extractStage(args.inputDir, args.manifestPath, args.payloadPath, args.reportPath);
    return;
  }

  if (args.command === "extract-keys") {
    await extractKeysStage(args.inputDir, args.manifestPath, args.payloadPath, args.reportPath);
    const stat = syncLangFile({
      payloadPath: args.payloadPath,
      langOutputPath: args.langOutputPath,
      mergeLang: args.mergeLang,
      dryRun: args.dryRun,
    });
    console.log(`[sync-lang] incoming=${stat.incoming} added=${stat.added} updated=${stat.updated} unchanged=${stat.unchanged} total=${stat.total}`);
    console.log(`[sync-lang] output=${stat.langOutputPath} dryRun=${stat.dryRun}`);
    return;
  }

  if (args.command === "sync-lang") {
    const stat = syncLangFile({
      payloadPath: args.payloadPath,
      langOutputPath: args.langOutputPath,
      mergeLang: args.mergeLang,
      dryRun: args.dryRun,
    });
    console.log(`[sync-lang] incoming=${stat.incoming} added=${stat.added} updated=${stat.updated} unchanged=${stat.unchanged} total=${stat.total}`);
    console.log(`[sync-lang] output=${stat.langOutputPath} dryRun=${stat.dryRun}`);
    return;
  }

  if (args.command === "rewrite-keys") {
    await rewriteKeysStage(args.manifestPath, args.inputDir, args.dryRun, args.reportPath);
    return;
  }

  if (args.command === "translate") {
    if (!fs.existsSync(args.manifestPath)) {
      await extractStage(args.inputDir, args.manifestPath, args.payloadPath, args.reportPath);
    }
    await translateStage(args.manifestPath, args.payloadPath, args.translationsPath, args.reportPath, args);
    return;
  }

  if (args.command === "apply") {
    await applyStage(args.manifestPath, args.translationsPath, args.inputDir, args.dryRun);
    return;
  }

  await extractStage(args.inputDir, args.manifestPath, args.payloadPath, args.reportPath);
  await translateStage(args.manifestPath, args.payloadPath, args.translationsPath, args.reportPath, args);
  await applyStage(args.manifestPath, args.translationsPath, args.inputDir, args.dryRun);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
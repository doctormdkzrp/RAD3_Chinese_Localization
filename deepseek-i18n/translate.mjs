import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const assetsRoot = path.join(repoRoot, "assets");

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
    mod: null,
    all: false,
    mode: "missing",
    dryRun: false,
    batchSize: Number(process.env.DEEPSEEK_BATCH_SIZE || 80),
    temperature: Number(process.env.DEEPSEEK_TEMPERATURE || 0.2),
    maxRetry: Number(process.env.DEEPSEEK_MAX_RETRY || 2),
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--mod") out.mod = argv[++i] || null;
    else if (a === "--all") out.all = true;
    else if (a === "--mode") out.mode = argv[++i] || "missing";
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--batch-size") out.batchSize = Number(argv[++i] || out.batchSize);
    else if (a === "--temperature") out.temperature = Number(argv[++i] || out.temperature);
    else if (a === "--max-retry") out.maxRetry = Number(argv[++i] || out.maxRetry);
  }

  if (!out.mod && !out.all) out.mod = "ntrials";
  if (!["missing", "fix-english", "all"].includes(out.mode)) {
    throw new Error("--mode must be one of: missing, fix-english, all");
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
  return out;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJsonStable(filePath, enObj, zhObj) {
  const ordered = {};
  for (const key of Object.keys(enObj)) {
    ordered[key] = key in zhObj ? zhObj[key] : enObj[key];
  }
  for (const key of Object.keys(zhObj)) {
    if (!(key in ordered)) ordered[key] = zhObj[key];
  }
  fs.writeFileSync(filePath, JSON.stringify(ordered, null, 2) + "\n", "utf8");
}

function findMods() {
  if (!fs.existsSync(assetsRoot)) return [];
  return fs
    .readdirSync(assetsRoot)
    .filter((name) => {
      const en = path.join(assetsRoot, name, "lang", "en_us.json");
      return fs.existsSync(en);
    })
    .sort();
}

function containsEnglish(value) {
  const t = String(value)
    .replace(/%(?:\d+\$)?[sdif]/g, "")
    .replace(/§[0-9A-FK-ORa-fk-or]/g, "")
    .replace(/\\n/g, "");
  return /[A-Za-z]{3,}/.test(t);
}

function extractPlaceholders(value) {
  return String(value).match(/%(?:\d+\$)?[sdif]/g) || [];
}

function extractSectionCodes(value) {
  return String(value).match(/§[0-9A-FK-ORa-fk-or]/g) || [];
}

function sameMultiset(a, b) {
  if (a.length !== b.length) return false;
  const m = new Map();
  for (const x of a) m.set(x, (m.get(x) || 0) + 1);
  for (const x of b) {
    const n = m.get(x) || 0;
    if (n <= 0) return false;
    m.set(x, n - 1);
  }
  return [...m.values()].every((v) => v === 0);
}

function splitBatches(entries, size) {
  const res = [];
  for (let i = 0; i < entries.length; i += size) {
    res.push(entries.slice(i, i + size));
  }
  return res;
}

function tryParseJsonObject(text) {
  try {
    const j = JSON.parse(text);
    if (j && typeof j === "object" && !Array.isArray(j)) return j;
  } catch {
    // ignore
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const maybe = text.slice(start, end + 1);
    try {
      const j = JSON.parse(maybe);
      if (j && typeof j === "object" && !Array.isArray(j)) return j;
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
    const v = obj[key];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v;
    }
  }
  return obj;
}

function buildMessages(glossary, payloadObj) {
  const system = [
    "你是 Minecraft 1.20.1 本地化专家，目标语言为简体中文。",
    "你必须严格返回 JSON 对象，不要返回任何额外文字。",
    "你必须保持输入 key 完全不变。",
    "你必须保留并原样输出所有占位符与格式标记：%s / %1$s / %d / %f / § 代码 / \\\\n。",
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

async function deepseekTranslateBatch({
  apiBase,
  apiKey,
  model,
  temperature,
  glossary,
  batchObj,
}) {
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

function validateAndMergeBatch(sourceBatchObj, translatedObj, oldZhObj, resultZhObj, modId) {
  const srcKeys = Object.keys(sourceBatchObj);
  const outKeys = Object.keys(translatedObj);

  const srcSet = new Set(srcKeys);
  const outSet = new Set(outKeys);

  if (srcSet.size !== outSet.size || srcKeys.some((k) => !outSet.has(k))) {
    const missing = srcKeys.filter((k) => !outSet.has(k));
    const extra = outKeys.filter((k) => !srcSet.has(k));
    const err = new Error(
      `[${modId}] Returned keys mismatch for batch. missing=${missing.length} extra=${extra.length}`
    );
    err.code = "KEY_MISMATCH";
    err.missing = missing;
    err.extra = extra;
    throw err;
  }

  let accepted = 0;
  let fallback = 0;

  for (const key of srcKeys) {
    const src = String(sourceBatchObj[key]);
    const candidate = String(translatedObj[key]);

    const srcPh = extractPlaceholders(src);
    const outPh = extractPlaceholders(candidate);
    const srcCode = extractSectionCodes(src);
    const outCode = extractSectionCodes(candidate);

    const phOk = sameMultiset(srcPh, outPh);
    const codeOk = sameMultiset(srcCode, outCode);

    if (phOk && codeOk) {
      resultZhObj[key] = candidate;
      accepted++;
    } else {
      resultZhObj[key] = key in oldZhObj ? oldZhObj[key] : src;
      fallback++;
      console.warn(`[${modId}] fallback key=${key} placeholder/code validation failed`);
    }
  }

  return { accepted, fallback };
}

async function translateWithRetryAndSplit({
  modId,
  entries,
  oldZhObj,
  newZhObj,
  apiBase,
  apiKey,
  model,
  temperature,
  glossary,
  maxRetry,
}) {
  const batchObj = Object.fromEntries(entries);

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
      const translatedObj = unwrapCommonContainer(raw);
      return validateAndMergeBatch(batchObj, translatedObj, oldZhObj, newZhObj, modId);
    } catch (err) {
      const retryable = err?.code === "KEY_MISMATCH";
      if (!retryable || attempt === maxRetry) {
        if (entries.length > 1) {
          const mid = Math.floor(entries.length / 2);
          console.warn(
            `[${modId}] split batch size=${entries.length} after mismatch; missing=${(err?.missing || []).slice(0, 2).join(",")} extra=${(err?.extra || []).slice(0, 2).join(",")}`
          );
          const left = await translateWithRetryAndSplit({
            modId,
            entries: entries.slice(0, mid),
            oldZhObj,
            newZhObj,
            apiBase,
            apiKey,
            model,
            temperature,
            glossary,
            maxRetry,
          });
          const right = await translateWithRetryAndSplit({
            modId,
            entries: entries.slice(mid),
            oldZhObj,
            newZhObj,
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

        const [singleKey, singleValue] = entries[0];
        newZhObj[singleKey] = singleKey in oldZhObj ? oldZhObj[singleKey] : singleValue;
        console.warn(`[${modId}] fallback single key due to repeated mismatch key=${singleKey}`);
        return { accepted: 0, fallback: 1 };
      }

      console.warn(
        `[${modId}] retry ${attempt}/${maxRetry} for mismatch; missing=${(err?.missing || []).length} extra=${(err?.extra || []).length}`
      );
    }
  }

  return { accepted: 0, fallback: 0 };
}

async function processMod({ modId, mode, batchSize, dryRun, apiBase, apiKey, model, temperature, glossary, maxRetry }) {
  const enPath = path.join(assetsRoot, modId, "lang", "en_us.json");
  const zhPath = path.join(assetsRoot, modId, "lang", "zh_cn.json");

  const enObj = readJson(enPath);
  const oldZhObj = fs.existsSync(zhPath) ? readJson(zhPath) : {};
  const newZhObj = { ...oldZhObj };

  const targetKeys = Object.keys(enObj).filter((key) => {
    if (mode === "all") return true;
    if (mode === "missing") return !(key in oldZhObj);
    if (mode === "fix-english") return key in oldZhObj && containsEnglish(oldZhObj[key]);
    return false;
  });

  if (targetKeys.length === 0) {
    console.log(`[${modId}] no keys to translate`);
    return { translated: 0, fallback: 0, changed: false };
  }

  const entries = targetKeys.map((key) => [key, enObj[key]]);
  const batches = splitBatches(entries, batchSize);

  let translated = 0;
  let fallback = 0;

  for (let i = 0; i < batches.length; i++) {
    const batchEntries = batches[i];
    console.log(`[${modId}] translating batch ${i + 1}/${batches.length} (${batchEntries.length} keys)`);

    const stat = await translateWithRetryAndSplit({
      modId,
      entries: batchEntries,
      oldZhObj,
      newZhObj,
      apiBase,
      apiKey,
      model,
      temperature,
      glossary,
      maxRetry,
    });
    translated += stat.accepted;
    fallback += stat.fallback;
  }

  const changed = JSON.stringify(oldZhObj) !== JSON.stringify(newZhObj);

  if (!dryRun && changed) {
    writeJsonStable(zhPath, enObj, newZhObj);
    console.log(`[${modId}] wrote ${zhPath}`);
  } else if (dryRun) {
    console.log(`[${modId}] dry-run: no file written`);
  }

  return { translated, fallback, changed };
}

async function main() {
  loadDotEnv(path.join(__dirname, ".env"));
  const args = parseArgs(process.argv.slice(2));

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const apiBase = process.env.DEEPSEEK_API_BASE || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is missing. Set it in deepseek-i18n/.env or shell env.");
  }

  const glossaryPath = path.join(__dirname, "glossary.json");
  const glossary = fs.existsSync(glossaryPath) ? readJson(glossaryPath) : {};

  const allMods = findMods();
  const modList = args.all ? allMods : [args.mod].filter(Boolean);

  if (modList.length === 0) {
    throw new Error("No mod matched. Check assets/<modid>/lang/en_us.json exists.");
  }

  let totalTranslated = 0;
  let totalFallback = 0;
  let totalChangedMods = 0;

  for (const modId of modList) {
    const enPath = path.join(assetsRoot, modId, "lang", "en_us.json");
    if (!fs.existsSync(enPath)) {
      console.warn(`[${modId}] skipped: en_us.json not found`);
      continue;
    }

    const stat = await processMod({
      modId,
      mode: args.mode,
      batchSize: args.batchSize,
      dryRun: args.dryRun,
      apiBase,
      apiKey,
      model,
      temperature: args.temperature,
      maxRetry: args.maxRetry,
      glossary,
    });

    totalTranslated += stat.translated;
    totalFallback += stat.fallback;
    if (stat.changed) totalChangedMods += 1;
  }

  console.log("--- summary ---");
  console.log(`mode=${args.mode}`);
  console.log(`dryRun=${args.dryRun}`);
  console.log(`temperature=${args.temperature}`);
  console.log(`maxRetry=${args.maxRetry}`);
  console.log(`translated=${totalTranslated}`);
  console.log(`fallback=${totalFallback}`);
  console.log(`changedMods=${totalChangedMods}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

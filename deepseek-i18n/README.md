# DeepSeek Minecraft 汉化工具

这个工具会把 `en_us.json` 的文本分批发送到 DeepSeek，并将结果回写到 `zh_cn.json`。

## 目标
- 保持 key 不变
- 保留 `%s`、`%1$s` 等占位符
- 保留 `§` 格式码和 `\\n`
- 支持术语表增强一致性
- 支持只补全缺失项，避免覆盖已有人工作品

## 快速开始
1. 复制环境变量模板并填写 API Key
   - Windows Bash:
     - `cp deepseek-i18n/.env.example deepseek-i18n/.env`
2. 编辑 `deepseek-i18n/.env`，填写 `DEEPSEEK_API_KEY`
3. 运行示例（补全 ntrials 缺失项）：
   - `node deepseek-i18n/translate.mjs --mod ntrials --mode missing`

## 常用参数
- `--mod <modid>`: 只处理一个模组（例如 `ntrials`）
- `--all`: 处理所有含 `en_us.json` 的模组
- `--mode <missing|fix-english|all>`
  - `missing`: 只翻译 zh 中缺失的 key（默认）
  - `fix-english`: 只翻译 zh 中 value 仍含英文的 key
  - `all`: 以 en_us 为准全量重翻
- `--batch-size <n>`: 每次请求翻译多少条（默认来自 `DEEPSEEK_BATCH_SIZE`）
- `--temperature <n>`: 模型温度（0~2，默认来自 `DEEPSEEK_TEMPERATURE`，未配置时为 `0.2`）
- `--max-retry <n>`: 单批次键不匹配时重试次数（1~10，默认来自 `DEEPSEEK_MAX_RETRY`，未配置时为 `2`）
- `--dry-run`: 只预览不落盘

## 示例
- 只补全 `skilltree`：
  - `node deepseek-i18n/translate.mjs --mod skilltree --mode missing`
- 修复 `zombie_fabrics` 的英文残留：
  - `node deepseek-i18n/translate.mjs --mod zombie_fabrics --mode fix-english`
- 使用更低温度，降低措辞波动：
  - `node deepseek-i18n/translate.mjs --mod ntrials --mode fix-english --temperature 0.1`
- 键不匹配时增加重试：
  - `node deepseek-i18n/translate.mjs --mod knavesneeds --mode fix-english --max-retry 4`
- 全量跑一遍但不写文件：
  - `node deepseek-i18n/translate.mjs --all --mode all --dry-run`

## 安全机制
- 响应必须是 JSON 对象（key:value）
- 会校验 key 集合是否完全一致
- 会校验 `%` 占位符与 `§` 代码是否保持不变
- 失败条目会自动回退（保留原文），并在日志中提示

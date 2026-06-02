# RAD3 Chinese Localization

非官方汉化资源包 for R.A.D.3 (Roguelike Adventures and Dungeons 3) Minecraft Modpack.

## 项目说明

本仓库提供 R.A.D.3 整合包中部分模组的中文语言文件。

- 这是个人维护的非官方汉化资源，不隶属于整合包官方或各模组作者。
- 使用AI翻译，因此可能有一些专用术语并不准确。

## Node 翻译工具说明

仓库内置了 DeepSeek 批量翻译脚本，目录为 deepseek-i18n。自行填入APIKEY即可使用

### 1. 环境准备

在仓库根目录执行：

```bash
cp deepseek-i18n/.env.example deepseek-i18n/.env
```

然后编辑 deepseek-i18n/.env，填写 DEEPSEEK_API_KEY。

### 2. 运行方式

可直接运行脚本：

```bash
node deepseek-i18n/translate.mjs --mod ntrials --mode missing
```

也可先进入工具目录后运行 npm 脚本：

```bash
cd deepseek-i18n
npm run translate -- --mod ntrials --mode missing
```

### 3. 常用参数

- --mod <modid>: 只处理一个模组
- --all: 处理所有含 en_us.json 的模组
- --mode <missing|fix-english|all>
  - missing: 只补全 zh_cn 缺失项
  - fix-english: 只修复 zh_cn 中仍为英文的项
  - all: 全量重翻
- --batch-size <n>: 每批翻译条目数
- --temperature <n>: 模型温度
- --max-retry <n>: 键不匹配时的重试次数
- --dry-run: 预览结果，不写入文件

### 4. 典型命令

```bash
# 补全某个模组的缺失项
node deepseek-i18n/translate.mjs --mod skilltree --mode missing

# 修复某个模组中的英文残留
node deepseek-i18n/translate.mjs --mod zombie_fabrics --mode fix-english

# 全部模组预跑，不写盘
node deepseek-i18n/translate.mjs --all --mode all --dry-run
```

## 当前包含的 MOD

- apotheosis
- apotheotic_hostility
- bloodmagic
- collectorsalbum
- creatures_of_petrichor
- dagger_of_bloodletting
- ftbquestlocalizer
- ftbquests
- grassoverhaul
- knavesneeds
- kubejs
- landsoficaria
- lrdynamicdungeon
- miners_delight
- nethersdelight
- ntrials
- oceansdelight
- radenchants
- radweaponry
- realmrpg_skeletons
- red_exp
- simplyswords
- skilltree
- sorcerousnether
- uniqueaccessories
- zombie_fabrics

## 免责声明

本仓库仅用于社区学习与交流。若相关作者提出要求，将及时调整或下线对应内容。

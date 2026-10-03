# 不要爱世界 · 约翰一书 2:15–17

欧陆改革宗释经讲章与交互学习网页。读经：约翰一书2:1–17。版本：2026-10-03 v1.0。

- GitHub Pages：https://08-ser-gt-je-personal-20261003.github.io/not-love-world-1john2-20261003-v1/
- Surge：https://not-love-world-1john2-20261003-v1.surge.sh

## 内容

完整读经、作者与历史背景、地图与考古实景、三点连续讲章、逐句释经、救赎历史、圣约神学、罪—救赎—感恩、经文互照、应用、七日复习、记忆卡、即时自测及12组讨论答案。主日圣诗版本不确定，按需求不处理歌词。

全文和答案默认展开。目录可隐藏，支持字号调整、深色模式、减少动态效果与打印。屏幕较窄时图文改单列，大表格在各自容器内左右滚动。

## 文件与编辑

- `index.html`：全部经文、讲章、讨论与参考来源，直接编辑即可。
- `styles.css`：宽屏、平板、手机、深色与打印样式。
- `app.js`：目录、字号、主题、阅读进度、时间线、卡片与自测。
- `assets/`：离线可用的图片与地图。
- `.github/workflows/`：推送 main 后部署两个公开站点。

无需构建，也不依赖外部字体、CDN或框架。直接打开 index.html 可阅读；使用任意本地静态服务器可预览。语法检查：`node --check app.js`。

## 持续部署

GitHub Pages 使用仓库 Settings → Pages → GitHub Actions。Surge 使用仓库 Actions secret `SURGE_TOKEN`；禁止在 HTML、脚本或版本记录中存储密码与令牌。发布工作流只复制公开页面文件到发布目录。后续编辑推送到 main，即触发两站更新。

## 出处与解释原则

全部参考链接及具体用途列于网页末尾。作者与时间、地点是传统归属或常见推定，不冒充书信自述。教会危机依据约一2:19、22、26和4:2–3等内证；当代例子与神学综合另有说明。信条要点为概述，不冒充逐字引文。

## 图片许可

`assets/ephesus.jpg`：Dudva，2022-09-14，Ancient Greek theatre (Ephesus)，CC BY-SA 4.0。

来源：https://commons.wikimedia.org/wiki/File:Ancient_Greek_theatre_(Ephesus).jpg

许可：https://creativecommons.org/licenses/by-sa/4.0/

保留原图，页面按容器缩放显示。不是第一世纪复原图。

`assets/eastern-mediterranean.svg`：基于 Natural Earth 1:110m land 公共领域数据生成，中文标注为本项目制作。是现代海岸线定位，非古代疆界或约翰行程复原。

数据来源：https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson

许可：https://www.naturalearthdata.com/about/terms-of-use/

和合本经文按1919年公共领域正文简体转写，标点作现代排版。照片的独立许可不因与网页打包而改变。

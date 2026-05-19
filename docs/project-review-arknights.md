# 明日方舟人格测试 — 项目深度分析

## 基本信息
- **仓库**: oldking-yes/arknights-personality-v2
- **语言**: TypeScript (React 19)
- **版本**: 3.0.0
- **规模**: 19 个源文件（不含 node_modules）+ vitest 单元测试
- **部署**: GitHub Pages + PWA 离线支持
- **国际**: 中英双语（i18next）

## 实际依赖（package.json）
```
react 19.2  |  framer-motion 12.38  |  chart.js 4.5
tailwindcss 4.3  |  i18next 26.2  |  vite 6.x  |  vitest
```

## 功能全景（远比当前卡片丰富）

| 模块 | 文件 | 说明 |
|------|------|------|
| 15 道战术情境题 | `data/questions.ts` | 沉浸式明日方舟世界观题目 |
| 5 维人格图谱 | `data/types.ts` | 雷达图可视化（chart.js） |
| 16 位干员匹配 | `data/operators.ts` | 基于 5 维向量+权重矩阵匹配 |
| 匹配算法 | `utils/matching.ts` | 加权欧氏距离 + 单元测试 |
| CP 兼容度 | `data/cp.ts` | 双人匹配卡片 |
| 分享卡片 | `utils/shareCards.ts` | 生成身份档案卡片 |
| PWA | 配置 | 离线安装、桌面图标 |
| 双语 | `i18n/zh.json` `i18n/en.json` | 完整中英文翻译 |
| 动画 | `framer-motion` | 入场/过渡/结果动画 |
| 持久化 | `utils/storage.ts` | localStorage 答题进度缓存 |

## 架构

```
src/
├── App.tsx              # 主流程: Intro → Quiz → Results
├── components/
│   ├── Intro.tsx         # 开场引导
│   ├── Quiz.tsx          # 15题问答引擎
│   ├── Results.tsx       # 结果展示(雷达图+干员匹配)
│   ├── RadarChart.tsx    # Chart.js 五维图谱
│   └── ErrorBoundary.tsx # 容错
├── data/
│   ├── questions.ts     # 15题题库
│   ├── operators.ts     # 16位干员数据+权重
│   ├── types.ts         # 5维人格类型定义
│   └── cp.ts            # CP配对数据
├── utils/
│   ├── matching.ts      # 匹配算法(含测试)
│   ├── shareCards.ts    # 分享卡片生成
│   └── storage.ts       # 状态持久化
├── i18n/
│   ├── zh.json          # 中文
│   ├── en.json          # 英文
│   └── index.ts         # i18next初始化
├── index.css            # Tailwind入口
└── main.tsx             # React入口
```

## 当前作品集缺失

| 当前标注 | 应补充 |
|---------|--------|
| 4 个技术栈标签 | **+ chart.js, framer-motion, i18n, PWA, vitest** |
| 仅提到"对话式人格评测" | **15 题+ 16 干员+ CP 卡片+ 双语+ PWA** |
| 未提部署 | **GitHub Pages + 离线 PWA** |
| 未提测试 | **vitest 单元测试 (matching.test.ts)** |

## 建议文案

```
描述: 沉浸式人格评测 × 明日方舟 IP
      15 道战术情境题 → 5 维人格图谱 → 16 位干员匹配

THINKING: [定位: 工程实践]
React 19 + TypeScript + Tailwind CSS 全栈前端，组件化拆分 Intro/Quiz/Results 三大流程。
加权欧氏距离匹配算法 + Chart.js 五维雷达图可视化，含 vitest 单元测试。
Framer Motion 动画 + i18next 中英双语 + PWA 离线支持。
GitHub Pages 部署，支持 CP 兼容度卡片、罗德岛身份档案、一键分享。
```

技术栈标注: `React 19`, `TypeScript`, `Tailwind CSS`, `Chart.js`, `Framer Motion`, `i18n`, `PWA`, `Vitest`

## 亮点提炼

| HR 关注点 | 展示内容 |
|-----------|---------|
| 工程能力 | 组件化架构、vitest 测试、类型安全 |
| 用户体验 | PWA 离线、双语、动画 |
| 数据可视化 | Chart.js 雷达图 |
| 产品思维 | CP 卡片、分享卡片、身份档案 |
| 持续维护 | 3.0 版本号，持续迭代 |

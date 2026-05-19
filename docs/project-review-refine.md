# 炼化自己 · Refine Yourself — 项目深度分析

## 基本信息
- **仓库**: oldking-yes/refine-yourself
- **框架**: Next.js 16 (App Router) + TypeScript
- **版本**: 0.1.0
- **数据库**: Supabase PostgreSQL + RLS 安全策略
- **AI**: DeepSeek API（人格分析 + 智能对话）
- **部署**: Vercel + 独立域名 refineyourself.asia
- **性质**: AI 人格克隆 SaaS 雏形

## 技术栈（远比当前标注丰富）

| 层面 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 + shadcn/ui + base-ui |
| 图标 | Lucide |
| 数据库 | Supabase PostgreSQL + RLS |
| AI | DeepSeek API |
| 部署 | Vercel + refineyourself.asia |
| 工具 | Zod 校验、ESLint |

## 架构

```
src/
├── app/
│   ├── layout.tsx        # Next.js Root Layout
│   ├── page.tsx          # 主页面（上传→分析→分享）
│   └── favicon.ico
├── components/           # UI 组件（shadcn/base-ui）
├── hooks/
│   └── use-in-view.ts    # 视口交叉观察
├── lib/
│   ├── chat-storage.ts   # 对话持久化
│   ├── utils.ts          # 工具函数
│   └── validators.ts     # Zod 校验
├── types/
│   ├── chat.ts           # 对话类型
│   ├── persona.ts        # 五层人格结构
│   └── api.ts            # API 类型
├── data/
│   └── prebuilt-personas.ts  # 预置角色（可跳过提炼直接对话）
├── supabase-schema.sql   # PostgreSQL 数据库定义 + RLS 策略
├── test-data/
│   ├── 马斯克-模拟聊天记录.txt
│   └── 马斯克-达沃斯2026采访.txt
├── zeabur-deploy.mjs     # Zeabur 部署脚本
└── .vercel/project.json  # Vercel 配置
```

## 五层人格结构（persona.ts）

```typescript
identity: string            // 身份认知
rules: string[]             // 行为规则
expression_style: string    // 表达风格
decision_patterns: string[] // 决策模式
conversation_samples: []    // 对话样本
```

新旧格式兼容的 `normalizeProfile()` 函数体现工程成熟度。

## 完整产品流程

```
用户上传 .txt 聊天记录
    → DeepSeek AI 分析语言特征
      → 生成五层人格画像
        → 生成唯一分享链接
          → 任何人与你的 AI 分身对话
            → 原始数据已删除（隐私优先）
```

## 当前作品集缺失

| 当前标注 | 应补充 |
|---------|--------|
| 仅「TypeScript, AI/LLM, Node.js」 | **Next.js, Supabase, DeepSeek, shadcn/ui, Tailwind CSS 4, Vercel** |
| "实验项目" | **SaaS 雏形** — 完整产品有数据库/部署/AI/分享 |
| 未提隐私设计 | **原始数据处理后即丢弃** |
| 域名写错 | 应为 `refine-yourself.vercel.app` 或 `refineyourself.asia` |

## 建议文案

```
描述: 上传聊天记录 → AI 提炼人格 → 生成可对话的数字分身
      Next.js 16 + DeepSeek + Supabase + 独立域名

THINKING: [定位: LLM应用]
从聊天数据清洗到 AI 人格建模的完整 SaaS 产品流程：
用户上传 .txt → DeepSeek 分析语言特征 → 生成五层人格画像 → 分享链接 → 公开对话。
Supabase PostgreSQL (RLS安全) 持久化，原始数据处理后即丢弃，隐私优先设计。
Next.js 16 App Router + shadcn/ui + Tailwind CSS 4 前端，Vercel 部署。
独立域名 refineyourself.asia，含预置角色（可跳过提炼直接体验对话）。
```

技术栈标注: `Next.js 16`, `TypeScript`, `DeepSeek API`, `Supabase`, `PostgreSQL`, `Tailwind CSS 4`, `shadcn/ui`

## 亮点提炼

| HR 关注点 | 展示内容 |
|-----------|---------|
| 全栈能力 | Next.js + Supabase + AI API 集成 |
| 产品思维 | 上传→分析→分享→对话，完整闭环 |
| 隐私意识 | 原始数据即用即弃 |
| 工程规范 | Zod 校验、类型安全、RLS 安全策略 |
| 独立域名 | refineyourself.asia |
| 预置体验 | 预置角色可跳过提炼，降低体验门槛 |

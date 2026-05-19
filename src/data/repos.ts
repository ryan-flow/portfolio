export interface Repo {
  name: string;
  displayName: string;
  description: string;
  rationale: string;
  language: string;
  stars: number;
  url: string;
  previewUrl?: string;
  techStack: string[];
  icon: string;
  gradient: string;
  image?: string;
}

export const repos: Repo[] = [
  {
    name: 'heritage-crs-platform',
    displayName: 'CRS 推荐系统平台',
    description:
      '毕设 | ASK-REC 对话推荐引擎 + Neo4j 知识图谱 + 双前端（小程序/React Web）全栈落地。',
    rationale:
      '[全栈系统·毕设] 基于 ASK-REC 引擎的多轮对话推荐，置信度三维状态机（显式偏好+隐式行为+交互数据）保障推荐质量。五级回退策略（本地KB→豆包LLM→网络搜索）确保100%回答覆盖。Neo4j 存储 200+ 非遗知识节点，推荐解释可溯源。独立负责数据库建模（16表）、API 设计（12端点）、双前端（小程序 + React SPA，21页面）。',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/oldking-yes/heritage-crs-platform',
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', 'Neo4j', 'React', 'TypeScript', '微信小程序'],
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #0c1929, #1a2a4a)',
    image: '/projects/项目截图/CRS推荐系统平台.png',
    previewUrl: 'https://frontend-l76hlj7sd-kukik-s-projects.vercel.app',
  },
  {
    name: 'refine-yourself',
    displayName: 'AI 人格克隆',
    description:
      '上传聊天记录 → DeepSeek AI 分析 → 五层人格画像 → 可对话的数字分身。Next.js 16 + Supabase SaaS 产品。',
    rationale:
      '[LLM应用] 完整 SaaS 产品流程（77 源文件/26 组件/5 API）：上传 .txt → DeepSeek 提炼五层人格（身份/行为规则/表达风格/决策模式/对话样本）→ 生成分享链接 → 公开对话。预置 12 个名人角色（Elon Musk/罗翔/李白等）。Supabase PostgreSQL + RLS 安全策略，原始数据即用即弃。Vercel OG Image 11 种主题社交卡片渲染。独立域名 refineyourself.asia。',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/oldking-yes/refine-yourself',
    techStack: ['Next.js 16', 'TypeScript', 'DeepSeek API', 'Supabase', 'PostgreSQL', 'Tailwind CSS 4', 'shadcn/ui'],
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0c1929, #0a2a3a)',
    image: '/projects/项目截图/炼化自己.png',
    previewUrl: 'https://refineyourself.asia/',
  },
  {
    name: 'arknights-personality-v2',
    displayName: 'AI 人格测试引擎',
    description:
      '沉浸式人格评测 × 明日方舟世界观——20 道战术情境题 → 5 维雷达图 → 16 位干员匹配。',
    rationale:
      '[工程实践] React 19 + TypeScript 全栈前端，20 道深度剧情题（Framer Motion 动画 + corruption 乱码特效）。欧氏距离五维匹配算法 + Chart.js 雷达图，含 vitest 单元测试。642 行 Canvas 分享引擎支持微信/小红书/B站三平台排版。CP 兼容度卡（18 组配对+双语标签）+ 罗德岛身份档案。i18next 中英双语 + PWA 离线安装（v3.0）。',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/oldking-yes/arknights-personality-v2',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Framer Motion', 'i18next', 'PWA', 'Vitest'],
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #0c1929, #1a1a3a)',
    image: '/projects/项目截图/明日方舟人格测试.png',
    previewUrl: 'https://oldking-yes.github.io/arknights-personality-v2/',
  },
  {
    name: 'ink-studio',
    displayName: '墨韵 · AI 水墨',
    description:
      'AI 驱动的水墨诗画生成器——输入关键词 → DeepSeek 创作诗句 → Canvas 实时渲染为水墨画。',
    rationale:
      '[AI创意] Cloudflare Worker 代理 DeepSeek API，用户输入关键词（如「秋思」）→ AI 自动生成题画诗 → Canvas 2D 实时渲染（4 种模板 + 印章 + PNG 导出）。SVG 动态水墨场景 + Web Audio 古琴音景。纯静态 GitHub Pages + Worker 边缘计算架构。',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/oldking-yes/ink-studio',
    techStack: ['DeepSeek API', 'Cloudflare Workers', 'Canvas 2D', 'SVG', 'Web Audio API', 'GitHub Pages'],
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #0c1929, #2a1a1a)',
    image: '/projects/项目截图/前端设计实验室.png',
    previewUrl: 'https://nebula-website-henna.vercel.app/',
  },
];

export interface Skill {
  name: string;
  color: string;
  category: string;
}

export const skills: Skill[] = [
  // 框架
  { name: 'React', color: '#61dafb', category: '框架' },
  { name: 'Next.js', color: '#e8e0d0', category: '框架' },
  { name: 'FastAPI', color: '#009688', category: '框架' },
  { name: 'Vite', color: '#bd34fe', category: '框架' },
  // 语言
  { name: 'TypeScript', color: '#3178c6', category: '语言' },
  { name: 'Python', color: '#3572a5', category: '语言' },
  { name: 'SQL', color: '#d33682', category: '语言' },
  // 数据库/后端
  { name: 'SQLAlchemy', color: '#d32f2f', category: '后端' },
  { name: 'Neo4j', color: '#018bff', category: '后端' },
  { name: 'Supabase', color: '#3ecf8e', category: '后端' },
  { name: 'PostgreSQL', color: '#336791', category: '后端' },
  // AI/LLM
  { name: 'DeepSeek', color: '#4d6bfe', category: 'AI' },
  { name: 'Prompt Engineering', color: '#f59e0b', category: 'AI' },
  // 前端
  { name: 'Tailwind CSS', color: '#06b6d4', category: '前端' },
  { name: 'Chart.js', color: '#ff6384', category: '前端' },
  { name: 'Framer Motion', color: '#e91e63', category: '前端' },
  // 平台
  { name: '微信小程序', color: '#07c160', category: '平台' },
  { name: 'PWA', color: '#5a0fc8', category: '平台' },
  { name: 'Vercel', color: '#e8e0d0', category: '平台' },
  { name: 'GitHub Pages', color: '#8fa4b8', category: '平台' },
];

export const githubUser = {
  username: 'oldking-yes',
  displayName: 'Zixuan Wang',
  avatarUrl: 'https://avatars.githubusercontent.com/u/54438040?v=4',
  bio: '数据科学与大数据专业 · AI Agent 开发者 · Claude Code 深度用户。全栈开发，CRS 推荐系统与 LLM 应用实践经验。',
  tagline: '数据科学 · AI Agent 开发 · Claude Code 生态实践者',
  githubUrl: 'https://github.com/oldking-yes',
  email: '2919178903@qq.com',
};

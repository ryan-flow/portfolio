export interface Repo {
  name: string;
  displayName: string;
  description: string;
  rationale: string;
  techStack: string[];
  url?: string;
  previewUrl?: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
  steps?: string[];
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  description?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack?: string[];
}

export const education: Education[] = [
  {
    school: '仲恺农业工程学院',
    degree: '本科',
    major: '数据科学与大数据技术',
    period: '2022.09 – 2026.06',
  },
];

export const experiences: Experience[] = [
  {
    company: '广州',
    role: 'AI 应用与全栈开发',
    period: '目前',
    description: '开发企业网站、财务自动化流程和桌面业务工具。',
    techStack: ['Python', 'TypeScript', 'React', 'PostgreSQL'],
  },
];

export const repos: Repo[] = [
  {
    name: 'laveda',
    displayName: 'LAVEDA 企业官网',
    description: '用一张可以滚动探索的工作台，介绍公司的 AI 服务和产品。',
    rationale: '我负责官网设计与前端开发。桌面端把字标归位和工作台换屏绑定在同一段滚动上，触屏端收起透视效果。',
    techStack: ['Next.js', 'GSAP', 'TypeScript'],
    previewUrl: 'https://laveda.cc/',
    linkLabel: '访问官网',
    image: '/projects/work/brand-workspace.webp',
    imageAlt: 'LAVEDA 官网的工程协作工作台、流程画布与工具窗口',
  },
  {
    name: 'finance-oa',
    displayName: '财务 OA 收集助手',
    description: '把多套 OA 的审批资料与金蝶凭证关联，供财务人员归档和复核。',
    rationale: '上传前检查已有附件，写入后重新读取对应凭证。中断的任务可以接着处理，匹配不上的单据交给人工复核。',
    techStack: ['Python', 'Playwright', 'SQLite'],
    previewUrl: 'https://laveda.cc/products/oa/#oa-case',
    linkLabel: '查看产品案例',
    image: '/projects/work/oa.webp',
    imageAlt: '财务助手按来源列出审批资料、附件和处理状态',
  },
  {
    name: 'ad-assistant',
    displayName: 'LAVEDA AI 投流助手',
    description: '把选品、预算比较和投后复盘放进同一个桌面应用。',
    rationale: '账号与会员授权分开处理。Windows 和 Mac 都有受邀测试包，Windows 会员版在两台业务设备上验证了升级和重启。',
    techStack: ['Electron', 'React', 'Node.js'],
    previewUrl: 'https://laveda.cc/touliu/',
    linkLabel: '查看投流助手',
    image: '/projects/work/marketing.webp',
    imageAlt: '投放方案中的预算与预测对比',
  },
  {
    name: 'geo',
    displayName: 'GEO 品牌曝光检测',
    description: '从买家的问题出发，查看 AI 回答有没有提到品牌、推荐了什么、引用了哪些来源。',
    rationale: '检测问题可以修改，后台任务分别请求模型并保存回答和引用。内测覆盖了 DeepSeek 批量任务与豆包单题。',
    techStack: ['Next.js', 'Fastify', 'PostgreSQL', 'pg-boss'],
    previewUrl: 'https://laveda.cc/products/geo/',
    linkLabel: '查看 GEO 案例',
    image: '/projects/work/geo.webp',
    imageAlt: 'GEO 检测页的模型选择与品牌需求表单',
  },
  {
    name: 'voucher',
    displayName: '微信立减金中台',
    description: '运营配置活动并发券，财务从同一批订单核对核销和账单。',
    rationale: '批次同步在多实例间互斥并限速。核销回调验证签名，再通过补拉日账单和去重处理遗漏记录。',
    techStack: ['Java 17', 'Spring Boot', 'Redis', 'Quartz'],
    previewUrl: 'https://laveda.cc/products/coupon/',
    linkLabel: '查看立减金案例',
    steps: ['同步券批次', '活动发券', '核销回调', '账单核对'],
  },
  {
    name: 'vanby',
    displayName: '万表 Vanby 网站案例',
    description: '为公司官网制作腕表客户案例，展示桌面和手机上的目录与咨询入口。',
    rationale: '分别选取桌面和手机画面，首页卡片强调腕表主视觉，案例详情保留品牌导航和顾问入口。',
    techStack: ['Next.js', 'React', 'TypeScript'],
    previewUrl: 'https://laveda.cc/products/vanby/',
    linkLabel: '查看万表案例',
    image: '/projects/work/vanby.webp',
    imageAlt: '万表网站首页的腕表主视觉、品牌导航与咨询入口',
  },
  {
    name: 'heritage-crs-platform',
    displayName: '非遗文化智能导览平台',
    description: '毕业设计。访客和数字人对话，按兴趣找到相关的非遗内容和活动。',
    rationale: '系统结合显式偏好、浏览记录和对话语义，决定何时继续追问、何时直接推荐。Web 和微信小程序共用后端。',
    techStack: ['Python', 'FastAPI', 'React', '微信小程序'],
    url: 'https://github.com/ryan-flow/heritage-crs-platform',
    linkLabel: '查看源码',
    image: '/projects/work/heritage.webp',
    imageAlt: '非遗数字导览首页上的数字人和开始对话按钮',
  },
];

export type Proficiency = 'expert' | 'advanced' | 'intermediate';

export interface Skill {
  name: string;
  color: string;
  category: string;
  proficiency: Proficiency;
}

export const skills: Skill[] = [
  // 框架
  { name: 'React', color: '#61dafb', category: '框架', proficiency: 'expert' },
  { name: 'Next.js', color: '#e8e0d0', category: '框架', proficiency: 'advanced' },
  { name: 'FastAPI', color: '#009688', category: '框架', proficiency: 'advanced' },
  { name: 'Vite', color: '#bd34fe', category: '框架', proficiency: 'expert' },
  // 语言
  { name: 'TypeScript', color: '#3178c6', category: '语言', proficiency: 'expert' },
  { name: 'Python', color: '#3572a5', category: '语言', proficiency: 'expert' },
  { name: 'SQL', color: '#d33682', category: '语言', proficiency: 'advanced' },
  // 数据库/后端
  { name: 'SQLAlchemy', color: '#d32f2f', category: '后端', proficiency: 'advanced' },
  { name: 'Neo4j', color: '#018bff', category: '后端', proficiency: 'intermediate' },
  { name: 'Supabase', color: '#3ecf8e', category: '后端', proficiency: 'advanced' },
  { name: 'PostgreSQL', color: '#336791', category: '后端', proficiency: 'advanced' },
  // AI/LLM
  { name: 'DeepSeek', color: '#4d6bfe', category: 'AI', proficiency: 'expert' },
  { name: 'Prompt Engineering', color: '#f59e0b', category: 'AI', proficiency: 'expert' },
  // 前端
  { name: 'Tailwind CSS', color: '#06b6d4', category: '前端', proficiency: 'expert' },
  { name: 'Chart.js', color: '#ff6384', category: '前端', proficiency: 'intermediate' },
  { name: 'Framer Motion', color: '#e91e63', category: '前端', proficiency: 'intermediate' },
  // 平台
  { name: '微信小程序', color: '#07c160', category: '平台', proficiency: 'advanced' },
  { name: 'PWA', color: '#5a0fc8', category: '平台', proficiency: 'intermediate' },
  { name: 'Vercel', color: '#e8e0d0', category: '平台', proficiency: 'advanced' },
  { name: 'GitHub Pages', color: '#8fa4b8', category: '平台', proficiency: 'advanced' },
];

export const githubUser = {
  username: 'ryan-flow',
  displayName: 'Zixuan Wang',
  avatarUrl: 'https://avatars.githubusercontent.com/u/54438040?v=4',
  bio: '在广州做 AI 应用、企业网站与业务自动化。',
  tagline: 'AI 应用开发 · 全栈工程',
  githubUrl: 'https://github.com/ryan-flow',
  email: '2919178903@qq.com',
  jobTarget: 'AI 应用与全栈开发 · 广州',
  resumeUrl: '/resume.pdf',
};

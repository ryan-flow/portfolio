export interface Repo {
  name: string;
  displayName: string;
  description: string;
  rationale: string;
  verification?: string;
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
    name: 'finance-oa',
    displayName: '财务 OA 收集助手',
    description: '财务要从多套 OA 收齐审批单和附件，再把材料挂到金蝶的对应凭证上。同一天可能有几张金额相同的凭证。',
    rationale: '我把采集和匹配接进财务工作台。遇到多个候选就留给财务确认。上传后从金蝶重新下载附件，核对文件内容。',
    verification: '一次本地归档抽查覆盖 67 条已归档申请，511 个文件副本通过了大小和 SHA-256 校验。',
    techStack: ['Python', 'Playwright', 'SQLite', '金蝶 SDK'],
    previewUrl: 'https://laveda.cc/products/oa/#oa-case',
    linkLabel: '查看产品案例',
    image: '/projects/work/oa.webp',
    imageAlt: '财务助手按来源列出审批资料、附件和处理状态',
  },
  {
    name: 'ad-assistant',
    displayName: 'LAVEDA AI 投流助手',
    description: '投手已经给几款商品定了预算，还想比较剩下的钱怎么分。每试一种方案，都得保住已经定下的金额。',
    rationale: '我把锁定商品和总预算做成分配规则。投手可以比较不同方案，选定后再把目标写入本次投期。',
    verification: 'Windows 受邀版已验证预算重算，重启应用后仍可打开已保存的投期。',
    techStack: ['Electron', 'React', 'Node.js'],
    previewUrl: 'https://laveda.cc/touliu/',
    linkLabel: '查看投流助手',
    image: '/projects/work/marketing.webp',
    imageAlt: '投放方案中的预算与预测对比',
  },
  {
    name: 'geo',
    displayName: 'GEO 品牌曝光检测',
    description: '品牌运营想知道，买家向 AI 询问选购建议时，自家品牌会不会被推荐，推荐的依据又是什么。',
    rationale: '运营先改好要问的问题。我用任务队列把检测分给不同模型，保存每道题的原回答和引用，让运营能逐条核查。',
    verification: '内测覆盖了 DeepSeek 批量任务和豆包单题检测。',
    techStack: ['Next.js', 'Fastify', 'PostgreSQL', 'pg-boss'],
    previewUrl: 'https://laveda.cc/products/geo/',
    linkLabel: '查看 GEO 案例',
    image: '/projects/work/geo.webp',
    imageAlt: 'GEO 检测页的模型选择与品牌需求表单',
  },
  {
    name: 'voucher',
    displayName: '微信立减金中台',
    description: '运营看券发了多少，财务关心哪些已经核销。微信的批次数据和次日账单到达的时间不同。',
    rationale: '我给批次加了定时同步。核销先校验微信回调的签名，次日再用账单补回漏掉的记录，同一笔核销只计一次。',
    techStack: ['Java 17', 'Spring Boot', 'Redis', 'Quartz'],
    previewUrl: 'https://laveda.cc/products/coupon/',
    linkLabel: '查看立减金案例',
    steps: ['同步券批次', '活动发券', '核销回调', '账单核对'],
  },
  {
    name: 'laveda',
    displayName: 'LAVEDA 企业官网',
    description: '第一次接触 LAVEDA 的访客，可以在首页看到产品的实际界面，再进入财务工具或投流助手的产品页。',
    rationale: '我负责官网设计和前端开发，用 GSAP 把工作台换屏和字标归位接在同一段滚动里。手机版减轻透视效果，给产品画面留出空间。',
    techStack: ['Next.js', 'GSAP', 'TypeScript'],
    previewUrl: 'https://laveda.cc/',
    linkLabel: '访问官网',
    image: '/projects/work/brand-workspace.webp',
    imageAlt: 'LAVEDA 官网的工程协作工作台、流程画布与工具窗口',
  },
  {
    name: 'vanby',
    displayName: '万表 Vanby 官网案例页',
    description: '我为 LAVEDA 官网制作了万表案例页，展示访客如何浏览腕表目录、找到顾问咨询入口。',
    rationale: '首页卡片选用腕表主视觉。详情页分别选取桌面和手机画面，让窄屏上的目录和咨询按钮也看得清。',
    techStack: ['Next.js', 'React', 'TypeScript'],
    previewUrl: 'https://laveda.cc/products/vanby/',
    linkLabel: '查看万表案例',
    image: '/projects/work/vanby.webp',
    imageAlt: '万表网站首页的腕表主视觉、品牌导航与咨询入口',
  },
  {
    name: 'heritage-crs-platform',
    displayName: '非遗文化智能导览平台',
    description: '我的本科毕业设计。访客可以从一句感兴趣的话题开始，和数字人一起找非遗项目或活动。',
    rationale: '我把浏览记录和对话里的偏好用于推荐。线索少时先追问，兴趣明确时再推荐内容。网页和微信小程序共用 FastAPI 后端。',
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
  bio: '我给财务做过审批归档工具，也给投手做过按商品分配预算的桌面软件。',
  tagline: '业务系统集成与 AI 应用交付',
  githubUrl: 'https://github.com/ryan-flow',
  email: '2919178903@qq.com',
  jobTarget: '前线部署全栈工程师（FDE）',
  resumeUrl: '/resume.pdf',
};

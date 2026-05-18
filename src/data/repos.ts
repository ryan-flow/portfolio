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
      'CRS 对话推荐引擎驱动的全栈应用，集成 AI 对话、知识图谱与小程序前端。',
    rationale:
      '核心决策：采用 ASK-REC 引擎实现多轮对话推荐，五级回退策略保证回答覆盖率。知识图谱用于增强推荐解释的透明度和可信度。16 张数据表支撑完整的用户、内容、交互数据闭环。',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/oldking-yes/heritage-crs-platform',
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', '微信小程序'],
    icon: '🏛️',
    gradient: 'linear-gradient(135deg, #0c1929, #1a2a4a)',
    image: '/projects/项目截图/CRS推荐系统平台竖版.png',
    previewUrl: 'https://frontend-l76hlj7sd-kukik-s-projects.vercel.app',
  },
  {
    name: 'arknights-personality-v2',
    displayName: 'AI 人格测试引擎',
    description:
      'LLM 驱动的对话式人格评测系统，React + TypeScript 全栈前端。',
    rationale:
      '设计自定义对话引擎，通过多轮交互式问答推理用户人格类型。采用组件化架构实现问题分支逻辑与结果计算分离，已部署上线并支持分享。',
    language: 'TypeScript',
    stars: 1,
    url: 'https://github.com/oldking-yes/arknights-personality-v2',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    icon: '🎮',
    gradient: 'linear-gradient(135deg, #0c1929, #1a1a3a)',
    image: '/projects/项目截图/明日方舟人格测试竖版.jpg',
    previewUrl: 'https://oldking-yes.github.io/arknights-personality-v2/',
  },
  {
    name: 'refine-yourself',
    displayName: 'AI 人格克隆',
    description:
      '从聊天记录中提取特征、训练个性化 AI 分身的实验项目。',
    rationale:
      '探索 LLM 人格模拟的技术边界——通过对话数据预处理、特征工程和模型微调，实现具有一致性格表达的 AI 对话代理。验证了"数据驱动人格建模"的技术可行性。',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/oldking-yes/refine-yourself',
    techStack: ['TypeScript', 'AI/LLM', 'Node.js'],
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0c1929, #0a2a3a)',
    image: '/projects/项目截图/炼化自己竖版.jpg',
    previewUrl: 'https://refineyourself.asia/',
  },
  {
    name: 'ink-studio',
    displayName: '前端设计实验室',
    description:
      '前端交互与视觉实验项目，纯原生技术栈实现。',
    rationale:
      '在没有框架依赖的前提下，探索 CSS 动效、Canvas 图形和交互设计的边界。实践了从视觉构思到代码实现的完整创意流程，培养了对细节和性能的敏感度。',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/oldking-yes/ink-studio',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #0c1929, #2a1a1a)',
    image: '/projects/项目截图/前端设计实验室竖版.jpg',
    previewUrl: 'https://oldking-yes.github.io/ink-studio/',
  },
];

export interface Skill {
  name: string;
  color: string;
}

export const skills: Skill[] = [
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Python', color: '#3572a5' },
  { name: 'React', color: '#61dafb' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'SQLAlchemy', color: '#d33682' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: '微信小程序', color: '#07c160' },
  { name: 'Node.js', color: '#339933' },
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

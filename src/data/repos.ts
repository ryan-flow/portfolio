export interface Repo {
  name: string;
  displayName: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
  url: string;
  techStack: string[];
  themeColor: string;
  icon: string;
  previewUrl?: string;
  featured?: boolean;
}

export const repos: Repo[] = [
  {
    name: 'heritage-crs-platform',
    displayName: '非遗文化传播平台',
    description:
      '基于 CRS 推荐系统的非遗文化传播平台——毕业设计项目，融合 AI 数字人「黑塔」对话、五级回退策略问答与知识图谱推荐解释生成。',
    language: 'Python',
    stars: 0,
    updatedAt: '2026-05-16',
    url: 'https://github.com/oldking-yes/heritage-crs-platform',
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', '微信小程序', '豆包大模型'],
    themeColor: '#c41e3a',
    icon: '🏛️',
    featured: true,
  },
  {
    name: 'arknight-personality-v2',
    displayName: '干员人格测试',
    description:
      '基于 React + Tailwind 的明日方舟干员人格测试应用，通过趣味问答匹配你的干员人格。',
    language: 'TypeScript',
    stars: 1,
    updatedAt: '2026-05-16',
    url: 'https://github.com/oldking-yes/arknight-personality-v2',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    themeColor: '#667eea',
    icon: '🎮',
  },
  {
    name: 'refine-yourself',
    displayName: 'AI 人格克隆',
    description:
      '从聊天记录中克隆 AI 人格，利用对话数据训练个性化 AI 分身，探索 AI 与人格模拟的前沿技术。',
    language: 'TypeScript',
    stars: 0,
    updatedAt: '2026-05-17',
    url: 'https://github.com/oldking-yes/refine-yourself',
    techStack: ['TypeScript', 'AI/LLM', 'Node.js'],
    themeColor: '#06b6d4',
    icon: '🤖',
  },
  {
    name: 'ink-studio',
    displayName: '墨水工作室',
    description:
      '创意数字工作室项目，聚焦前端交互技术与视觉表达。（项目描述待补充）',
    language: 'HTML',
    stars: 0,
    updatedAt: '2026-05-17',
    url: 'https://github.com/oldking-yes/ink-studio',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    themeColor: '#f59e0b',
    icon: '🎨',
  },
];

export interface Skill {
  name: string;
  category: string;
  color: string;
  level: number; // 0-100 proficiency
}

export const skills: Skill[] = [
  { name: 'React', category: '前端框架', color: '#61dafb', level: 75 },
  { name: 'TypeScript', category: '前端框架', color: '#3178c6', level: 80 },
  { name: 'Tailwind CSS', category: '前端框架', color: '#06b6d4', level: 70 },
  { name: '微信小程序', category: '前端框架', color: '#07c160', level: 85 },
  { name: 'Python', category: '后端技术', color: '#3572a5', level: 85 },
  { name: 'FastAPI', category: '后端技术', color: '#009688', level: 80 },
  { name: 'SQLAlchemy', category: '后端技术', color: '#d33682', level: 75 },
  { name: 'Node.js', category: '后端技术', color: '#339933', level: 65 },
  { name: 'Vite', category: '工具链', color: '#646cff', level: 70 },
];

export const githubUser = {
  username: 'oldking-yes',
  displayName: '老王',
  avatarUrl: 'https://avatars.githubusercontent.com/u/54438040?v=4',
  bio: '全栈开发者 · 非遗文化数字化 · AI 人格探索 · 游戏爱好者',
  githubUrl: 'https://github.com/oldking-yes',
  createdAt: '2019-08',
  tags: ['全栈开发', '非遗文化', 'AI 探索', '游戏开发'],
  email: '2919178903@qq.com',
};

export const aboutInfo = {
  intro:
    '一名热爱技术的全栈开发者，专注于用数字化手段保护和传播中国非物质文化遗产。从微信小程序到 AI 对话系统，从数据库设计到推荐算法，致力于打造有意义的产品。',
  directions: [
    {
      title: '全栈开发',
      desc: 'Vite + React 前端，FastAPI + SQLAlchemy 后端，微信小程序生态',
      icon: '⚡',
      color: '#61dafb',
    },
    {
      title: '非遗文化数字化',
      desc: '构建非遗文化传播平台，融合 CRS 推荐与知识图谱技术',
      icon: '🏛️',
      color: '#c41e3a',
    },
    {
      title: 'AI 探索',
      desc: 'AI 数字人对话、人格克隆、LLM 应用开发',
      icon: '🤖',
      color: '#06b6d4',
    },
  ],
};

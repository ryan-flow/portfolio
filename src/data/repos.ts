export interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
  url: string;
}

export const repos: Repo[] = [
  {
    name: 'arknight-personality-v2',
    description:
      'Arknights Operator Personality Quiz V2 — 基于 React + Tailwind 的明日方舟干员人格测试应用，通过趣味问答匹配你的干员人格。',
    language: 'TypeScript',
    stars: 1,
    updatedAt: '2026-05-16',
    url: 'https://github.com/oldking-yes/arknight-personality-v2',
  },
  {
    name: 'heritage-crs-platform',
    description:
      'Intangible Cultural Heritage CRS Platform — 非遗文化传播平台（毕业设计），致力于通过数字化手段保护和传播中国非物质文化遗产。',
    language: 'Python',
    stars: 0,
    updatedAt: '2026-05-16',
    url: 'https://github.com/oldking-yes/heritage-crs-platform',
  },
  {
    name: 'refine-yourself',
    description:
      'AI Persona Clone — 从聊天记录中克隆 AI 人格，利用对话数据训练个性化 AI 分身。探索 AI 与人格模拟的前沿技术。',
    language: 'TypeScript',
    stars: 0,
    updatedAt: '2026-05-17',
    url: 'https://github.com/oldking-yes/refine-yourself',
  },
  {
    name: 'ink-studio',
    description:
      '一个创意数字工作室项目，聚焦于前端交互技术与视觉表达。（项目描述待补充）',
    language: 'HTML',
    stars: 0,
    updatedAt: '2026-05-17',
    url: 'https://github.com/oldking-yes/ink-studio',
  },
];

export interface Skill {
  name: string;
  count: number;
  color: string;
}

export const skills: Skill[] = [
  { name: 'TypeScript', count: 2, color: '#3178c6' },
  { name: 'Python', count: 1, color: '#3572a5' },
  { name: 'HTML', count: 1, color: '#e34c26' },
];

export const githubUser = {
  username: 'oldking-yes',
  displayName: '老王',
  avatarUrl: 'https://avatars.githubusercontent.com/u/54438040?v=4',
  bio: '全栈开发者 · 非遗文化数字化 · AI 人格探索 · 游戏爱好者',
  githubUrl: 'https://github.com/oldking-yes',
  createdAt: '2019-08',
};

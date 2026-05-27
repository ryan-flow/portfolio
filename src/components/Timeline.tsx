import { Box, Container, Typography, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BrushIcon from '@mui/icons-material/Brush';
import { education, repos } from '../data/repos';

const projectCards = [
  {
    icon: <BuildIcon sx={{ fontSize: 22 }} />,
    title: 'CRS 推荐系统平台',
    role: '毕业设计 · 优秀毕设',
    period: '2025',
    subtitle: 'Python · FastAPI · Neo4j · React',
    description:
      '基于 ASK-REC 引擎的多轮对话推荐系统。置信度三维状态机（显式偏好+隐式行为+交互数据）保障推荐质量，五级回退策略确保 100% 回答覆盖。Neo4j 存储 200+ 非遗知识节点，推荐解释可溯源。独立负责数据库建模（16 表）、API 设计（12 端点）、双前端（微信小程序 + React SPA，21 页面）。',
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', 'Neo4j', 'React', 'TypeScript', '微信小程序'],
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 22 }} />,
    title: 'PRD Agent RAG',
    role: '独立项目',
    period: '2025',
    subtitle: 'FastAPI · PydanticAI · ChromaDB · DeepSeek',
    description:
      'AI 驱动产品需求文档生成系统。FastAPI + PydanticAI Agent 编排，ChromaDB 向量知识库内置 JTBD 框架、RICE 排序等产品方法论。WebSocket 流式对话 + Markdown 实时渲染，JWT 邮箱注册登录。双域名部署（Zeabur 后端 + Vercel 前端）。',
    techStack: ['FastAPI', 'PydanticAI', 'ChromaDB', 'DeepSeek', 'React 18', 'WebSocket', 'JWT'],
  },
  {
    icon: <BrushIcon sx={{ fontSize: 22 }} />,
    title: 'AI 人格克隆 · 炼化自己',
    role: '独立项目',
    period: '2025',
    subtitle: 'Next.js 16 · TypeScript · Supabase · DeepSeek',
    description:
      '完整 SaaS 产品（77 源文件 / 26 组件 / 5 API）：上传聊天记录 → DeepSeek 提炼五层人格画像 → 生成分享链接 → 公开对话。预置 12 个名人角色，Supabase RLS 安全策略，Vercel OG Image 11 种主题社交卡片渲染。独立域名 refineyourself.asia。',
    techStack: ['Next.js 16', 'TypeScript', 'DeepSeek API', 'Supabase', 'PostgreSQL', 'Tailwind CSS 4', 'shadcn/ui'],
  },
];

function Timeline(): JSX.Element {
  return (
    <Box component="section" id="timeline" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }} className="reveal">
          <Typography
            variant="overline"
            sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}
          >
            BACKGROUND
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mt: 0.5 }}>
            教育背景 / 项目经历
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 } }}>

          {/* === Education Card === */}
          <Box className="reveal">
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid rgba(143,164,184,0.10)',
                background: 'rgba(143,164,184,0.04)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(139,168,192,0.20), rgba(139,168,192,0.08))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#8ba8c0',
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'text.primary' }}>
                      {education[0].school}
                    </Typography>
                    <Typography sx={{ color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.72rem' }}>
                      {education[0].period}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#8fa4b8', fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>
                    {education[0].degree} · {education[0].major}
                  </Typography>
                  {education[0].description && (
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.8 }}>
                      {education[0].description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* === Project Experience Cards === */}
          {projectCards.map((card) => (
            <Box key={card.title} className="reveal">
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: '1px solid rgba(143,164,184,0.10)',
                  background: 'rgba(143,164,184,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(139,168,192,0.20), rgba(139,168,192,0.08))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#8ba8c0',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 0.5, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'text.primary' }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.72rem' }}>
                        {card.period}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#8fa4b8', fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>
                      {card.role}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.8, mb: 2 }}>
                      {card.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {card.techStack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(143,164,184,0.08)',
                            color: '#a0b8cc',
                            border: '1px solid rgba(143,164,184,0.15)',
                            fontWeight: 600,
                            fontSize: '0.65rem',
                            height: 22,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

        </Box>
      </Container>
    </Box>
  );
}

export default Timeline;

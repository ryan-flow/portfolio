import { Box, Container, Typography, Grid2 as Grid } from '@mui/material';

const directions = [
  {
    num: '01',
    title: 'AI Agent 开发',
    desc: '熟悉 LangChain、ReAct 框架与 AI 编程工具链，具备 AI 应用从原型设计到生产落地的全链路能力。',
  },
  {
    num: '02',
    title: '全栈开发',
    desc: 'React + FastAPI + SQLAlchemy 全栈开发，微信小程序生态，从数据库到前端的端到端实现。',
  },
  {
    num: '03',
    title: '非遗文化数字化',
    desc: '构建 CRS 推荐系统驱动的非遗文化传播平台，融合 AI 数字人与知识图谱技术，用科技守护传统。',
  },
];

function About(): JSX.Element {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left: Intro */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box className="reveal">
              <Typography
                variant="overline"
                sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace', mb: 1, display: 'block' }}
              >
                ABOUT
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                用技术
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #c8a96e, #8ba8c0)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {' '}传承文化
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9, mb: 2 }}>
                你好，我是王子轩。数据科学与大数据专业，AI Agent 开发者。善于利用 Claude Code 等 AI 编程工具高效构建全栈应用。
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9, mb: 2 }}>
                从微信小程序到 AI 对话系统，从数据库设计到推荐算法——我享受从零到一构建完整产品的过程。毕业设计「墨韵」是一个基于 CRS 推荐系统的非遗文化传播平台，也是我对技术+文化融合的一次深入实践。
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9 }}>
                熟悉 LangChain、ReAct 等 Agent 框架，具备 AI 应用从原型到落地的全链路开发能力。持续探索 AI Agent、LLM 应用与编程效率工具的创新边界。
              </Typography>
            </Box>
          </Grid>

          {/* Right: Bento Grid */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {/* Stats card — glow behind */}
              <Box
                className="glass-hover"
                sx={{
                  gridColumn: { sm: 'span 2' },
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(200,169,110,0.06)',
                  background: 'rgba(200,169,110,0.03)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '30%',
                    left: '40%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle at center, rgba(160,216,240,0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
                    GitHub 注册
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8ba8c0' }}>
                    2019.08
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
                    开源项目
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8ba8c0' }}>
                    4 个
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
                    技术领域
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#8ba8c0' }}>
                    全栈·AI·文化
                  </Typography>
                </Box>
              </Box>

              {/* Direction cards — each with subtle glow */}
              {directions.map((dir) => (
                <Box
                  key={dir.title}
                  className="glass-hover"
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid rgba(200,169,110,0.06)',
                    background: 'rgba(200,169,110,0.03)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '150%',
                      height: '150%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle at center, rgba(160,216,240,0.04) 0%, transparent 60%)',
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                      pointerEvents: 'none',
                    },
                    '&:hover::before': { opacity: 1 },
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="body2" sx={{ color: '#8ba8c0', fontFamily: 'monospace', fontSize: '0.75rem', mb: 1 }}>
                      {dir.num}
                    </Typography>
                    <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: 'text.primary' }}>
                      {dir.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.7 }}>
                      {dir.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;

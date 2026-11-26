import { Box, Container, Typography, Grid2 as Grid } from '@mui/material';

const directions = [
  {
    topic: '系统集成',
    title: 'OA 与金蝶',
    desc: '用 Playwright 读取审批页面，通过金蝶 SDK 读写凭证附件，SQLite 保存办理进度。',
  },
  {
    topic: 'AI 应用',
    title: '异步检测',
    desc: '用 Fastify 接收检测请求，pg-boss 执行模型任务，PostgreSQL 保存回答与引用。',
  },
  {
    topic: '应用交付',
    title: '网页与桌面端',
    desc: '我用 React 做操作界面，给 Windows 和 Mac 打过 Electron 受邀测试包。',
  },
];

function About(): JSX.Element {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left: Intro */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box className="reveal">
              <Typography
                variant="overline"
                sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace', mb: 1, display: 'block' }}
              >
                关于我
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                  在广州做
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    全栈开发
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9, mb: 2 }}>
                我本科学数据科学与大数据技术，毕业设计做了数字人导览。工作后，我开始给财务和投手写工具，也做了公司的官网。
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9, mb: 2 }}>
                下一份工作，我想离实际用软件的人更近。遇到说不清的规则，我希望能和使用者一起过一笔单，再决定该改界面还是改后台。
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.9 }}>
                工作之外，我喜欢游戏，也对 AI 人格和对话角色感兴趣。
              </Typography>
            </Box>
          </Grid>

          {/* Right: Direction cards */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {/* Featured card — spans full width */}
              <Box
                className="glass-hover"
                sx={{
                  gridColumn: { sm: 'span 2' },
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(143,164,184,0.08)',
                  background: 'rgba(143,164,184,0.04)',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '30%',
                    left: '40%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle at center, rgba(160,216,240,0.05) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Typography variant="body2" sx={{ position: 'relative', zIndex: 1, color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.7rem', mb: 0.5 }}>
                  项目使用的语言
                </Typography>
                <Typography variant="h4" sx={{ position: 'relative', zIndex: 1, fontSize: '1rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.7 }}>
                  TypeScript · Python · Java
                </Typography>
              </Box>

              {/* Direction cards */}
              {directions.map((dir) => (
                <Box
                  key={dir.title}
                  className="glass-hover"
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid rgba(143,164,184,0.08)',
                    background: 'rgba(143,164,184,0.04)',
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
                      {dir.topic}
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

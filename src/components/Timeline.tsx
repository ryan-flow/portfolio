import { Box, Container, Typography, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BrushIcon from '@mui/icons-material/Brush';
import { education } from '../data/repos';

const projectCards = [
  {
    icon: <BuildIcon sx={{ fontSize: 22 }} />,
    title: '财务归档与凭证回读',
    role: '业务流程自动化',
    period: '2026',
    description:
      '把写前查重、附件上传和写后回读分别记录。中断后按台账续办，不确定的匹配留给人工复核。',
    techStack: ['Python', 'Playwright', 'SQLite'],
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 22 }} />,
    title: '投流助手版本交付',
    role: '桌面应用发行',
    period: '2026',
    description:
      'Windows 会员版在两台设备验证升级，检查原数据、账号权限、正常业务页面和重启。',
    techStack: ['Electron', 'React', 'Node.js'],
  },
  {
    icon: <BrushIcon sx={{ fontSize: 22 }} />,
    title: 'LAVEDA 官网交互与发布',
    role: '网站设计与开发',
    period: '2026',
    description:
      '实现随原生滚动归位的字标。发布时核对静态资源、桌面和手机视口，并保留减少动态的读法。',
    techStack: ['Next.js', 'TypeScript', 'GSAP'],
  },
];

function Timeline(): JSX.Element {
  return (
    <Box component="section" id="timeline" sx={{ py: { xs: 6, md: 10 }, }}>
      <Container maxWidth="md" sx={{ }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }} className="scroll-title-left">
          <Typography
            variant="overline"
            sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}
          >
            工作与学习
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

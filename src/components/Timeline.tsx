import { Box, Container, Typography, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { education } from '../data/repos';

const projectCards = [
  {
    icon: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 22 }} />,
    title: '券批次自动同步上线',
    role: '微信立减金中台',
    period: '2026.09',
    description:
      '正在发放的批次频繁更新，已结束的批次降低频率。上线后，用同步日志和微信返回的批次数据核对了实际执行结果。',
    techStack: ['Java', 'Spring Boot', 'Redis'],
  },
  {
    icon: <DesktopWindowsOutlinedIcon sx={{ fontSize: 22 }} />,
    title: '在业务电脑上升级投流助手',
    role: 'LAVEDA AI 投流助手',
    period: '2026.10',
    description:
      '两台 Windows 业务电脑安装了会员版。升级前后逐项核对账号权限和旧数据，重启后再次打开原有商品和投期。',
    techStack: ['Electron', 'React', 'Node.js'],
  },
  {
    icon: <BuildIcon sx={{ fontSize: 22 }} />,
    title: '修正被当成付款的备注行',
    role: '财务 OA 收集助手',
    period: '2026.11',
    description:
      '审批明细里有金额为零的说明行，采集时被误当成付款。我把说明保留在原件里，只按实际付款归档，用两笔原单重跑并完成归档。',
    techStack: ['Python', 'Playwright', 'SQLite'],
  },
];

function Timeline(): JSX.Element {
  return (
    <Box component="section" id="timeline" sx={{ py: { xs: 6, md: 10 }, }}>
      <Container maxWidth="md" sx={{ }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }} className="scroll-title-left">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mt: 0.5 }}>
            教育与交付经历
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

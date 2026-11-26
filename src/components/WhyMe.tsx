import { Box, Container, Typography } from '@mui/material';

const highlights = [
  {
    num: '证据',
    unit: '链',
    label: '模型输出可追溯',
    desc: 'GEO 保存模型回答与引用，便于回查每次检测结果。',
  },
  {
    num: '幂等',
    unit: '',
    label: '账单可以安全重跑',
    desc: '立减金核销用账单校验与幂等归并，补齐遗漏记录。',
  },
  {
    num: '边界',
    unit: '',
    label: '说明验收覆盖范围',
    desc: '交付记录区分公开展示、内测，以及实际业务验收。',
  },
];

function WhyMe(): JSX.Element {
  return (
    <Box
      component="section"
      id="whyme"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }} className="scroll-title-left">
          <Typography
            variant="overline"
            sx={{
              color: '#8ba8c0',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              fontFamily: '"SF Mono", "Fira Code", monospace',
            }}
          >
            开发与交付
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              fontWeight: 700,
              mt: 0.5,
              color: '#e8e0d0',
            }}
          >
            工作方法
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {highlights.map((h, i) => (
            <Box
              key={h.label}
              className={`scroll-stagger-${i + 1}`}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid rgba(143,164,184,0.10)',
                background: 'rgba(143,164,184,0.03)',
                backdropFilter: 'blur(12px)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(143,164,184,0.22)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.2rem' },
                  fontWeight: 800,
                  lineHeight: 1,
                  mb: 0.5,
                  background: 'linear-gradient(135deg, #b8c8d8, #d0dce6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {h.num}
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    fontWeight: 600,
                    WebkitTextFillColor: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {h.unit}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#e8e0d0',
                  mb: 0.5,
                }}
              >
                {h.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.5,
                }}
              >
                {h.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default WhyMe;

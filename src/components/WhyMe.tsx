import { Box, Container, Typography } from '@mui/material';

const highlights = [
  {
    title: '保留财务熟悉的目录',
    desc: '第一版的反馈是，月底要按月份找资料，平时还要按付款方找。我保留原目录，同一批审批材料也按年月归好。',
  },
  {
    title: '上传中断，先查结果',
    desc: '上传途中断线，重试时先从金蝶读一遍已有附件。文件已经到了就跳过，确认缺失才补传，这条规则也用于后续批次。',
  },
  {
    title: '把两种买家问法分开',
    desc: '“通勤用哪款耳机”和“某品牌的耳机怎么样”问的是两件事。我把两组回答分开看，分别核对模型主动推荐了谁、被点名时又怎么说。',
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
            variant="h2"
            sx={{
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              fontWeight: 700,
              mt: 0.5,
              color: '#e8e0d0',
            }}
          >
            项目里的技术取舍
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
              key={h.title}
              className={`scroll-stagger-${i + 1}`}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid rgba(143,164,184,0.10)',
                background: 'rgba(143,164,184,0.03)',
                backdropFilter: 'blur(12px)',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(143,164,184,0.22)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 700,
                  lineHeight: 1.45,
                  mb: 1.25,
                  background: 'linear-gradient(135deg, #b8c8d8, #d0dce6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {h.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.88rem',
                  color: 'text.secondary',
                  lineHeight: 1.75,
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

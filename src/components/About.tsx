import { Box, Container, Typography, Card, CardContent, Grid2 as Grid } from '@mui/material';
import { aboutInfo, repos } from '../data/repos';

function About(): JSX.Element {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a0a 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              letterSpacing: '0.15em',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            ABOUT
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mt: 1,
            }}
          >
            关于我
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              background: 'linear-gradient(90deg, #c41e3a, #c9a94e)',
              mx: 'auto',
              mt: 2,
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Intro text */}
        <Box sx={{ maxWidth: 680, mx: 'auto', textAlign: 'center', mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.9,
            }}
          >
            {aboutInfo.intro}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              🗓️ GitHub 注册于 <strong style={{ color: '#c9a94e' }}>2019 年 8 月</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              📦 <strong style={{ color: '#c9a94e' }}>{repos.length}</strong> 个开源项目
            </Typography>
          </Box>
        </Box>

        {/* Direction cards */}
        <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center">
          {aboutInfo.directions.map((dir, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dir.title}>
              <Card
                className="card-hover"
                sx={{
                  height: '100%',
                  p: { xs: 2, md: 3 },
                  textAlign: 'center',
                  borderColor: 'rgba(201, 169, 78, 0.06)',
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out ${0.15 * (index + 1)}s forwards`,
                }}
              >
                <CardContent sx={{ px: 0 }}>
                  {/* Icon */}
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      mb: 1.5,
                      display: 'block',
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    {dir.icon}
                  </Typography>

                  {/* Title with accent underline */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      mb: 1,
                      color: dir.color,
                    }}
                  >
                    {dir.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {dir.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default About;

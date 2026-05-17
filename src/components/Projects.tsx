import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid2 as Grid,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { repos } from '../data/repos';

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return '今天';
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`;
  return `${Math.floor(diffDays / 365)} 年前`;
}

function Projects(): JSX.Element {
  const featured = repos.find((r) => r.featured);
  const others = repos.filter((r) => !r.featured);

  return (
    <Box
      component="section"
      id="projects"
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
            PROJECTS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mt: 1,
            }}
          >
            开源项目
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

        {/* Featured project */}
        {featured && (
          <Box
            sx={{
              mb: 5,
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out 0.1s forwards',
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                letterSpacing: '0.12em',
                fontSize: '0.7rem',
                fontWeight: 600,
                mb: 2,
                display: 'block',
                textAlign: 'center',
              }}
            >
              ⭐ 毕业设计项目
            </Typography>
            <Card
              className="card-hover featured-border"
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                borderColor: `rgba(196, 30, 58, 0.15)`,
                position: 'relative',
                '&:hover': {
                  borderColor: 'rgba(196, 30, 58, 0.4)',
                  '& .featured-badge': {
                    opacity: 1,
                  },
                },
              }}
            >
              {/* Visual area */}
              <Box
                sx={{
                  height: { xs: 160, md: 220 },
                  background: `linear-gradient(135deg, ${featured.themeColor}35, ${featured.themeColor}08)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 30% 40%, ${featured.themeColor}25, transparent 70%)`,
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.05,
                    backgroundImage: `radial-gradient(circle, ${featured.themeColor} 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: '4rem', md: '5.5rem' },
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
                  }}
                >
                  {featured.icon}
                </Typography>
              </Box>

              <Box sx={{ p: { xs: 3, md: 4 } }}>
                {/* Title + badge */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Chip
                    label="Featured"
                    size="small"
                    className="featured-badge"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                      height: 22,
                      opacity: 0.8,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      fontWeight: 700,
                    }}
                  >
                    {featured.displayName}
                  </Typography>
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2.5,
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    maxWidth: 800,
                  }}
                >
                  {featured.description}
                </Typography>

                {/* Tech stack */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                  {featured.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        height: 26,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor: 'rgba(196,30,58,0.08)',
                        color: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(196,30,58,0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(196,30,58,0.15)',
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    查看源码
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                    <CalendarTodayIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatTimeAgo(featured.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        )}

        {/* Other projects grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {others.map((repo, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={repo.name}>
              <Card
                className="card-hover"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out ${0.2 * (index + 1)}s forwards`,
                  borderColor: 'rgba(201, 169, 78, 0.06)',
                  overflow: 'hidden',
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: `rgba(201, 169, 78, 0.2)`,
                    '& .card-visual': {
                      transform: 'scale(1.06)',
                    },
                  },
                }}
              >
                {/* Visual */}
                <Box
                  className="card-visual"
                  sx={{
                    height: { xs: 110, md: 130 },
                    background: `linear-gradient(135deg, ${repo.themeColor}30, ${repo.themeColor}08)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'transform 0.35s ease',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 70% 30%, ${repo.themeColor}18, transparent 70%)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.05,
                      backgroundImage: `radial-gradient(circle, ${repo.themeColor} 1px, transparent 1px)`,
                      backgroundSize: '22px 22px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '2.8rem', md: '3.5rem' },
                      lineHeight: 1,
                      position: 'relative',
                      zIndex: 1,
                      filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))',
                    }}
                  >
                    {repo.icon}
                  </Typography>
                </Box>

                <CardContent sx={{ flex: 1, p: { xs: 2.5, md: 3 }, pb: 1 }}>
                  {/* Name + stars */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {repo.displayName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, flexShrink: 0, ml: 1 }}>
                      <StarIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {repo.stars}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 1.5,
                      fontSize: '0.8rem',
                      lineHeight: 1.7,
                      minHeight: { xs: 'auto', md: 42 },
                    }}
                  >
                    {repo.description}
                  </Typography>

                  {/* Tech stack */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                    {repo.techStack.slice(0, 3).map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          bgcolor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        variant="outlined"
                      />
                    ))}
                    {repo.techStack.length > 3 && (
                      <Typography variant="caption" sx={{ color: 'text.secondary', alignSelf: 'center' }}>
                        +{repo.techStack.length - 3}
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: { xs: 2.5, md: 3 }, pb: { xs: 2.5, md: 3 }, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.5)',
                      borderColor: 'rgba(255,255,255,0.08)',
                      '&:hover': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(196, 30, 58, 0.06)',
                      },
                    }}
                    variant="outlined"
                  >
                    查看源码
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Projects;

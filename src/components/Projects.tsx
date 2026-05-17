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

/** Language-to-color mapping for code tags */
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
};

/** Format a date string into a relative "X time ago" style */
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
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0a0a 0%, #12121a 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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

        {/* Project cards grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {repos.map((repo, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={repo.name}>
              <Card
                className="card-hover"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`,
                  borderColor: 'rgba(201, 169, 78, 0.08)',
                  '&:hover': {
                    borderColor: 'rgba(201, 169, 78, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
                  {/* Language color dot + repo name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: languageColors[repo.language] || '#888',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {repo.name}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      minHeight: { xs: 'auto', md: 48 },
                      lineHeight: 1.7,
                    }}
                  >
                    {repo.description}
                  </Typography>

                  {/* Meta chips */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                    <Chip
                      label={repo.language}
                      size="small"
                      sx={{
                        backgroundColor: `${languageColors[repo.language]}20`,
                        color: languageColors[repo.language],
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        border: `1px solid ${languageColors[repo.language]}40`,
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {repo.stars}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatTimeAgo(repo.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: { xs: 3, md: 4 }, pb: { xs: 3, md: 4 }, pt: 0 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderColor: 'divider',
                      color: 'text.primary',
                      fontSize: '0.8rem',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(196, 30, 58, 0.08)',
                      },
                    }}
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

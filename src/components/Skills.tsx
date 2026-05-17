import { Box, Container, Typography } from '@mui/material';
import { skills } from '../data/repos';

const categories = [...new Set(skills.map((s) => s.category))];

function Skills(): JSX.Element {
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f1a 100%)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* Section header */}
        <Typography
          variant="overline"
          sx={{
            color: 'secondary.main',
            letterSpacing: '0.15em',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          SKILLS
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            mt: 1,
            mb: 1,
          }}
        >
          技术栈
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 3,
            background: 'linear-gradient(90deg, #c9a94e, #c41e3a)',
            mx: 'auto',
            mb: 6,
            borderRadius: 2,
          }}
        />

        {categories.map((category, catIndex) => (
          <Box key={category} sx={{ mb: catIndex < categories.length - 1 ? 5 : 0 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                letterSpacing: '0.12em',
                fontSize: '0.7rem',
                mb: 3,
                display: 'block',
              }}
            >
              {category}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                maxWidth: 520,
                mx: 'auto',
              }}
            >
              {skills
                .filter((s) => s.category === category)
                .map((skill, index) => (
                  <Box
                    key={skill.name}
                    sx={{
                      textAlign: 'left',
                      opacity: 0,
                      animation: `fadeInUp 0.4s ease-out ${0.08 * (index + 1)}s forwards`,
                    }}
                  >
                    {/* Skill name + level */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.8,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: skill.color,
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>

                    {/* Progress bar */}
                    <Box
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 3,
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
                          animation: `fillBar 1s ease-out ${0.3 + 0.1 * index}s forwards`,
                          transformOrigin: 'left',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: -1,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: skill.color,
                            boxShadow: `0 0 12px ${skill.color}60`,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default Skills;

import { Box, Container, Typography, Chip } from '@mui/material';
import { skills } from '../data/repos';

function Skills(): JSX.Element {
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #12121a 0%, #0a0a0a 100%)',
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
            mb: 2,
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

        {/* Skill chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2.5,
          }}
        >
          {skills.map((skill, index) => (
            <Chip
              key={skill.name}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: skill.color,
                    }}
                  />
                  <span>
                    {skill.name}
                    <Typography
                      component="span"
                      sx={{ color: 'text.secondary', ml: 0.5, fontWeight: 400 }}
                    >
                      × {skill.count}
                    </Typography>
                  </span>
                </Box>
              }
              sx={{
                px: 2,
                py: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
                backgroundColor: `${skill.color}15`,
                color: skill.color,
                border: `1px solid ${skill.color}30`,
                borderRadius: '20px',
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${0.1 * (index + 1)}s forwards`,
                '&:hover': {
                  backgroundColor: `${skill.color}25`,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 6px 20px ${skill.color}20`,
                },
                transition: 'all 0.3s ease',
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  py: 0.5,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Skills;

import { Box, Container, Typography } from '@mui/material';
import { skills } from '../data/repos';

function Skills(): JSX.Element {
  return (
    <Box component="section" id="skills" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: 6 }} className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            SKILLS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mt: 1 }}>
            技术栈
          </Typography>
        </Box>

        {/* Bento grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2, maxWidth: 900, mx: 'auto' }}>
          {/* Featured: TypeScript */}
          <Box className="glass-hover" sx={{ p: 3, gridColumn: { sm: 'span 2' }, borderRadius: 3, border: '1px solid rgba(200,169,110,0.06)', background: 'rgba(200,169,110,0.03)', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden',
            '&::before': { content: '""', position: 'absolute', top: '40%', left: '30%', width: '200%', height: '200%', background: 'radial-gradient(circle at center, rgba(160,216,240,0.05) 0%, transparent 60%)', pointerEvents: 'none' },
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontSize: '1.6rem', fontWeight: 700, color: '#3178c6', mb: 0.5 }}>TypeScript</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>主力开发语言，贯穿前端后端项目</Typography>
              <Box sx={{ mt: 1.5, height: 4, borderRadius: 2, backgroundColor: 'rgba(49,120,198,0.12)', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 2, width: '80%', backgroundColor: '#3178c6', animation: 'fillBar 1.2s ease-out forwards' }} />
              </Box>
            </Box>
          </Box>

          {/* Featured: Python */}
          <Box className="glass-hover" sx={{ p: 3, gridColumn: { sm: 'span 2' }, borderRadius: 3, border: '1px solid rgba(200,169,110,0.06)', background: 'rgba(200,169,110,0.03)', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden',
            '&::before': { content: '""', position: 'absolute', top: '40%', left: '30%', width: '200%', height: '200%', background: 'radial-gradient(circle at center, rgba(160,216,240,0.05) 0%, transparent 60%)', pointerEvents: 'none' },
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontSize: '1.6rem', fontWeight: 700, color: '#3572a5', mb: 0.5 }}>Python</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>后端主力，FastAPI + SQLAlchemy 生态</Typography>
              <Box sx={{ mt: 1.5, height: 4, borderRadius: 2, backgroundColor: 'rgba(53,114,165,0.12)', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 2, width: '85%', backgroundColor: '#3572a5', animation: 'fillBar 1.2s ease-out 0.15s forwards' }} />
              </Box>
            </Box>
          </Box>

          {/* Other skills */}
          {skills.slice(2).map((skill) => (
            <Box key={skill.name} className="glass-hover" sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, border: '1px solid rgba(200,169,110,0.06)', background: 'rgba(200,169,110,0.03)', backdropFilter: 'blur(8px)' }}>
              <Typography variant="body2" sx={{ color: skill.color, fontWeight: 600, fontSize: '0.85rem', mb: 0.5 }}>
                {skill.name}
              </Typography>
              <Box sx={{ height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', borderRadius: 2, width: `${60 + Math.random() * 30}%`, backgroundColor: skill.color, animation: 'fillBar 1s ease-out forwards' }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Skills;

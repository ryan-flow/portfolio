import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, TextField, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const WORKER_URL = '/api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  { label: '最有挑战的项目', prompt: '你做过的项目里，技术上最有挑战的是哪个？难在哪？' },
  { label: '为什么选 AI 方向', prompt: '你为什么选择 AI 产品经理/应用开发方向？' },
  { label: '一个人怎么做的', prompt: '这些项目是你一个人完成的吗？遇到不会的技术怎么解决？' },
  { label: '成本控制', prompt: '你的项目在 API 调用和部署上怎么控制成本的？' },
  { label: '和别人有什么不同', prompt: '跟同届应届生比，你觉得自己最大的优势是什么？' },
];

function AiChat(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const parseSSEStream = useCallback(async (reader: ReadableStreamDefaultReader<Uint8Array>, onChunk: (text: string) => void) => {
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) onChunk(content);
          } catch {
            // skip malformed lines
          }
        }
      }
    }
  }, []);

  const sendMessage = useCallback(async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);

    setLoading(true);
    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`请求失败 (${res.status}): ${errText}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('无法读取响应流');

      let accumulated = '';
      await parseSSEStream(reader, (chunk) => {
        accumulated += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: accumulated };
          }
          return updated;
        });
      });
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: `抱歉，出错了：${err.message}。请稍后再试。` },
      ]);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, parseSSEStream]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Liquid Glass shared styles ── */
  const glassOuter = {
    background: `linear-gradient(
      135deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.04) 30%,
      rgba(255,255,255,0.01) 50%,
      rgba(255,255,255,0.06) 70%,
      rgba(255,255,255,0.10) 100%
    )`,
    backdropFilter: 'blur(40px) saturate(1.8) brightness(1.1)',
    WebkitBackdropFilter: 'blur(40px) saturate(1.8) brightness(1.1)',
    border: '1px solid rgba(255,255,255,0.18)',
    boxShadow: (
      '0 8px 32px rgba(0,0,0,0.25),'
      + 'inset 0 1px 0 rgba(255,255,255,0.15),'
      + 'inset 0 -1px 0 rgba(255,255,255,0.05)'
    ),
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  /* Refraction highlight — the arc of light across the top */
  const refractionHighlight = {
    content: '""',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: `linear-gradient(
      180deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.03) 40%,
      transparent 100%
    )`,
    borderRadius: 'inherit',
    pointerEvents: 'none' as const,
    zIndex: 0,
  };

  return (
    <Box
      component="section"
      id="ai-chat"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3 },
        px: { xs: 1.5, sm: 3 },
        position: 'relative',
      }}
    >
      {/* ── Liquid Glass capsule ── */}
      <Box
        className="reveal"
        sx={{
          ...glassOuter,
          width: '100%',
          maxWidth: 800,
          height: { xs: 'calc(100vh - 32px)', sm: 'calc(100vh - 48px)' },
          maxHeight: { xs: 'calc(100vh - 32px)', sm: 'calc(100vh - 48px)' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: { xs: '28px', sm: '32px' },
        }}
      >
        {/* Refraction arc highlight */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: `linear-gradient(
              180deg,
              rgba(255,255,255,0.09) 0%,
              rgba(255,255,255,0.03) 35%,
              transparent 100%
            )`,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Top bar — glass panel ── */}
        <Box
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 1.6,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {/* Glass icon pill */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <Typography sx={{ fontSize: '0.85rem', lineHeight: 1, color: 'rgba(255,255,255,0.8)' }}>✦</Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.3,
              }}
            >
              AI 对话
            </Typography>
          </Box>
        </Box>

        {/* ── Messages ── */}
        <Box
          ref={listRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: { xs: 2.5, sm: 3.5 },
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            scrollBehavior: 'smooth',
            position: 'relative',
            zIndex: 1,
            '&::-webkit-scrollbar': { width: 3 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 2,
            },
          }}
        >
          {/* Empty state */}
          {messages.length === 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2.5,
              }}
            >
              {/* Glass orb */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                <Typography sx={{ fontSize: '1.3rem', lineHeight: 1, color: 'rgba(255,255,255,0.85)' }}>✦</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                    mb: 0.6,
                  }}
                >
                  你好，随便问
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.82rem' },
                    color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.6,
                    maxWidth: 280,
                    mx: 'auto',
                  }}
                >
                  项目经历、技术选型、求职方向
                </Typography>
              </Box>

              {/* Quick prompts — glass chips */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 0.7,
                  maxWidth: 400,
                }}
              >
                {QUICK_PROMPTS.map((qp) => (
                  <Box
                    key={qp.label}
                    onClick={() => sendMessage(qp.prompt)}
                    sx={{
                      px: 1.6,
                      py: 0.7,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: { xs: '0.72rem', sm: '0.76rem' },
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      lineHeight: 1.4,
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.85)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {qp.label}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: { xs: '88%', sm: '75%' },
                animation: 'fadeInUp 0.3s ease-out',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.3)',
                  mb: 0.4,
                  fontWeight: 500,
                }}
              >
                {msg.role === 'user' ? '你' : 'AI'}
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 1.2,
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: msg.role === 'user'
                    ? '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: { xs: '0.82rem', sm: '0.87rem' },
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                  {loading && i === messages.length - 1 && msg.role === 'assistant' && !msg.content && (
                    <Box component="span" sx={{ display: 'inline-flex', gap: 0.4, ml: 0.5, verticalAlign: 'middle' }}>
                      {[0, 0.2, 0.4].map((d) => (
                        <Box
                          key={d}
                          component="span"
                          sx={{
                            animation: 'dotPulse 1.4s infinite both',
                            animationDelay: `${d}s`,
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            display: 'inline-block',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ── Input bar — glass surface ── */}
        <Box
          sx={{
            px: { xs: 1.8, sm: 2.5 },
            py: 1.4,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
            background: 'rgba(255,255,255,0.03)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="问关于王子轩的问题…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.85rem',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                borderRadius: '14px',
                px: 1.5,
                py: 0.8,
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                '&::placeholder': { color: 'rgba(255,255,255,0.22)' },
                '&:focus-within': {
                  borderColor: 'rgba(255,255,255,0.18)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                borderRadius: '14px',
              },
            }}
          />
          <IconButton
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              background: loading || !input.trim()
                ? 'transparent'
                : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.08)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))',
              },
              '&.Mui-disabled': { background: 'transparent', border: '1px solid transparent' },
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: 'rgba(255,255,255,0.6)' }} />
            ) : (
              <SendIcon sx={{ color: input.trim() ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)', fontSize: 18, transition: 'color 0.2s' }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default AiChat;

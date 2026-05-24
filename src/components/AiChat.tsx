import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, TextField, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// Vercel Rewrites 代理 /api/chat → 腾讯云服务器
const WORKER_URL = '/api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function AiChat(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是王子轩（Ryan）的 AI 助手。你可以问我关于他的技术栈、项目经历或求职方向的问题 👋' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto scroll to bottom
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
      const lines = buffer.split('\n');
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

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
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
        { role: 'assistant', content: `抱歉，出错了：${err.message}。请稍后再试或直接发邮件到 oldking.yes@outlook.com` },
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

  const handleClose = () => {
    if (loading && abortRef.current) {
      abortRef.current.abort();
    }
    setOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8fa4b8, #6a8ca8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(143, 164, 184, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: '0 6px 28px rgba(143, 164, 184, 0.45)',
            },
            animation: 'pulse-glow 3s ease-in-out infinite',
            '@keyframes pulse-glow': {
              '0%, 100%': { boxShadow: '0 4px 20px rgba(143, 164, 184, 0.3)' },
              '50%': { boxShadow: '0 4px 28px rgba(143, 164, 184, 0.55)' },
            },
          }}
        >
          <AutoFixHighIcon sx={{ color: '#0a0a0a', fontSize: 28 }} />
        </Box>
      )}

      {/* Chat panel */}
      {open && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: { xs: 'calc(100vw - 32px)', sm: 380 },
            maxWidth: 380,
            height: 520,
            maxHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            backgroundColor: 'rgba(14, 14, 16, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(143, 164, 184, 0.12)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(143, 164, 184, 0.08)',
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon sx={{ color: '#8fa4b8', fontSize: 22 }} />
              <Typography sx={{ color: '#e8e0d0', fontSize: '0.88rem', fontWeight: 600 }}>
                AI 助手 · 王子轩
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.35)' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 1.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(143, 164, 184, 0.2)', borderRadius: 2 },
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor:
                      msg.role === 'user'
                        ? 'rgba(143, 164, 184, 0.15)'
                        : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid',
                    borderColor:
                      msg.role === 'user'
                        ? 'rgba(143, 164, 184, 0.20)'
                        : 'rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#e8e0d0',
                      fontSize: '0.82rem',
                      lineHeight: 1.65,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                    {loading && i === messages.length - 1 && msg.role === 'assistant' && !msg.content && (
                      <Box component="span" sx={{ display: 'inline-flex', gap: 0.3, ml: 0.5 }}>
                        <Box component="span" sx={{ animation: 'dotPulse 1.4s infinite both', animationDelay: '0s', width: 4, height: 4, borderRadius: '50%', backgroundColor: '#8fa4b8', display: 'inline-block' }} />
                        <Box component="span" sx={{ animation: 'dotPulse 1.4s infinite both', animationDelay: '0.2s', width: 4, height: 4, borderRadius: '50%', backgroundColor: '#8fa4b8', display: 'inline-block' }} />
                        <Box component="span" sx={{ animation: 'dotPulse 1.4s infinite both', animationDelay: '0.4s', width: 4, height: 4, borderRadius: '50%', backgroundColor: '#8fa4b8', display: 'inline-block' }} />
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid rgba(143, 164, 184, 0.08)',
              display: 'flex',
              gap: 1,
              flexShrink: 0,
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
                  color: '#e8e0d0',
                  fontSize: '0.82rem',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.8,
                  '&::placeholder': { color: 'rgba(255,255,255,0.25)' },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderRadius: 1.5,
                },
              }}
            />
            <IconButton
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              sx={{
                alignSelf: 'flex-end',
                width: 38,
                height: 38,
                backgroundColor: loading ? 'transparent' : 'rgba(143, 164, 184, 0.15)',
                '&:hover': { backgroundColor: 'rgba(143, 164, 184, 0.25)' },
                '&.Mui-disabled': { backgroundColor: 'transparent' },
              }}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: '#8fa4b8' }} />
              ) : (
                <SendIcon sx={{ color: '#8fa4b8', fontSize: 18 }} />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}

export default AiChat;

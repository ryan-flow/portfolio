import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, TextField, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好！我是王子轩的 AI 助手。你可以问我关于他的技术能力、项目经历或求职方向的任何问题 👋' },
  ]);
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
        { role: 'assistant', content: `抱歉，出错了：${err.message}。请稍后再试或直接发邮件到 2919178903@qq.com` },
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

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
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
            width: { xs: 'calc(100vw - 32px)', sm: 400 },
            maxWidth: 400,
            height: 560,
            maxHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            backgroundColor: 'rgba(10, 10, 12, 0.95)',
            border: '1px solid rgba(143, 164, 184, 0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(143, 164, 184, 0.08)',
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon sx={{ color: '#8fa4b8', fontSize: 20 }} />
              <Typography sx={{ color: '#e8e0d0', fontSize: '0.85rem', fontWeight: 600 }}>
                AI · 王子轩
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.3)' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2.5,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { width: 3 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(143, 164, 184, 0.15)', borderRadius: 2 },
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.2,
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor:
                      msg.role === 'user'
                        ? 'rgba(143, 164, 184, 0.12)'
                        : 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <Typography
                    sx={{
                      color: msg.role === 'user' ? '#c8d0d8' : '#b8c0c8',
                      fontSize: '0.85rem',
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
                              backgroundColor: 'rgba(143, 164, 184, 0.5)',
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

            {/* Quick prompts - only show when no user messages yet */}
            {messages.length === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 0.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', px: 0.5 }}>
                  试试问我：
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {QUICK_PROMPTS.map((qp) => (
                    <Box
                      key={qp.label}
                      onClick={() => handleQuickPrompt(qp.prompt)}
                      sx={{
                        px: 1.5,
                        py: 0.7,
                        borderRadius: '20px',
                        border: '1px solid rgba(143, 164, 184, 0.15)',
                        backgroundColor: 'rgba(143, 164, 184, 0.05)',
                        color: 'rgba(200, 208, 216, 0.7)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        lineHeight: 1.4,
                        '&:hover': {
                          backgroundColor: 'rgba(143, 164, 184, 0.12)',
                          borderColor: 'rgba(143, 164, 184, 0.3)',
                          color: '#e8e0d0',
                        },
                      }}
                    >
                      {qp.label}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Input */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid rgba(143, 164, 184, 0.06)',
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
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.8,
                  '&::placeholder': { color: 'rgba(255,255,255,0.2)' },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                },
              }}
            />
            <IconButton
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              sx={{
                alignSelf: 'flex-end',
                width: 36,
                height: 36,
                backgroundColor: loading || !input.trim() ? 'transparent' : 'rgba(143, 164, 184, 0.12)',
                '&:hover': { backgroundColor: 'rgba(143, 164, 184, 0.22)' },
                '&.Mui-disabled': { backgroundColor: 'transparent' },
                transition: 'background-color 0.2s',
              }}
            >
              {loading ? (
                <CircularProgress size={16} sx={{ color: '#8fa4b8' }} />
              ) : (
                <SendIcon sx={{ color: input.trim() ? '#8fa4b8' : 'rgba(143,164,184,0.3)', fontSize: 17, transition: 'color 0.2s' }} />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}

export default AiChat;

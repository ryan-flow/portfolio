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

const WELCOME_FEATURES = [
  { icon: '💡', text: '技术选型与架构决策' },
  { icon: '🚀', text: '项目经历与难点攻克' },
  { icon: '🎯', text: '求职方向与职业规划' },
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
      <Box
        className="reveal"
        sx={{
          width: '100%',
          maxWidth: 800,
          height: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 48px)' },
          maxHeight: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 48px)' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          backgroundColor: 'rgba(143,164,184,0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(143,164,184,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 1.8,
            borderBottom: '1px solid rgba(143,164,184,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"SF Mono", "Fira Code", monospace',
              fontSize: '0.75rem',
              color: '#8ba8c0',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            AI CHAT
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              fontWeight: 700,
              color: '#e8e0d0',
              lineHeight: 1.3,
            }}
          >
            AI 对话
          </Typography>
        </Box>

        {/* Messages */}
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
            '&::-webkit-scrollbar': { width: 3 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(143,164,184,0.2)',
              borderRadius: 2,
            },
          }}
        >
          {/* Empty state — welcome card */}
          {messages.length === 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              {/* Welcome heading */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.3rem', sm: '1.6rem' },
                    fontWeight: 700,
                    color: '#e8e0d0',
                    mb: 1,
                  }}
                >
                  你好，随便问
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.78rem', sm: '0.85rem' },
                    color: 'rgba(255,255,255,0.3)',
                    lineHeight: 1.6,
                    maxWidth: 360,
                  }}
                >
                  关于项目经历、技术选型与求职方向
                </Typography>
              </Box>

              {/* Feature tags */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {WELCOME_FEATURES.map((f) => (
                  <Box
                    key={f.text}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.6,
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 2,
                      border: '1px solid rgba(143,164,184,0.10)',
                      backgroundColor: 'rgba(143,164,184,0.04)',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9rem' }}>{f.icon}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                      {f.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Quick prompt cards */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', maxWidth: 500 }}>
                {QUICK_PROMPTS.map((qp) => (
                  <Box
                    key={qp.label}
                    onClick={() => !loading && sendMessage(qp.prompt)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: '1px solid rgba(143,164,184,0.12)',
                      backgroundColor: 'rgba(143,164,184,0.05)',
                      color: 'rgba(200,208,216,0.55)',
                      fontSize: '0.78rem',
                      cursor: loading ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(143,164,184,0.10)',
                        borderColor: 'rgba(143,164,184,0.25)',
                        color: '#e8e0d0',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {qp.label}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Chat messages */}
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
                  fontSize: '0.68rem',
                  color: msg.role === 'user' ? 'rgba(143,164,184,0.55)' : 'rgba(143,164,184,0.45)',
                  mb: 0.4,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                {msg.role === 'user' ? '你' : 'AI'}
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 1.2,
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  backgroundColor:
                    msg.role === 'user'
                      ? 'rgba(143,164,184,0.12)'
                      : 'rgba(255,255,255,0.05)',
                  border: '1px solid',
                  borderColor: msg.role === 'user'
                    ? 'rgba(143,164,184,0.15)'
                    : 'rgba(255,255,255,0.06)',
                }}
              >
                <Typography
                  sx={{
                    color: msg.role === 'user' ? '#d0d8e0' : '#c0c8d0',
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
                            backgroundColor: 'rgba(143,164,184,0.6)',
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

        {/* Persistent quick prompts — only show after messages exist */}
        {messages.length > 0 && (
          <Box
            sx={{
              px: { xs: 2, sm: 2.5 },
              py: 1,
              borderTop: '1px solid rgba(143,164,184,0.06)',
              display: 'flex',
              gap: 0.6,
              overflowX: 'auto',
              flexShrink: 0,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {QUICK_PROMPTS.map((qp) => (
              <Box
                key={qp.label}
                onClick={() => !loading && sendMessage(qp.prompt)}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '16px',
                  border: '1px solid rgba(143,164,184,0.12)',
                  backgroundColor: 'rgba(143,164,184,0.05)',
                  color: 'rgba(200,208,216,0.55)',
                  fontSize: '0.72rem',
                  cursor: loading ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.4,
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  opacity: loading ? 0.4 : 1,
                  '&:hover': {
                    backgroundColor: 'rgba(143,164,184,0.1)',
                    borderColor: 'rgba(143,164,184,0.25)',
                    color: '#e8e0d0',
                  },
                }}
              >
                {qp.label}
              </Box>
            ))}
          </Box>
        )}

        {/* Input bar */}
        <Box
          sx={{
            px: { xs: 2, sm: 2.5 },
            py: 1.2,
            borderTop: '1px solid rgba(143,164,184,0.06)',
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
            backgroundColor: 'rgba(10,10,10,0.4)',
            flexShrink: 0,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="输入你想了解的内容…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#e0e4e8',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(143,164,184,0.06)',
                borderRadius: 2,
                px: 1.5,
                py: 0.8,
                border: '1px solid rgba(143,164,184,0.1)',
                '&::placeholder': { color: 'rgba(255,255,255,0.25)' },
                '&:focus-within': {
                  borderColor: 'rgba(143,164,184,0.25)',
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'rgba(143,164,184,0.06)',
                borderRadius: 2,
              },
            }}
          />
          <IconButton
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            sx={{
              width: 38,
              height: 38,
              border: '1px solid rgba(143,164,184,0.18)',
              backgroundColor: loading || !input.trim()
                ? 'rgba(10,10,10,0.25)'
                : 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: input.trim() ? '#c8d8e8' : 'rgba(200,216,232,0.22)',
              '&:hover': {
                backgroundColor: 'rgba(10,10,10,0.80)',
                borderColor: '#8ba8c0',
                color: '#fff',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(10,10,10,0.25)',
                borderColor: 'rgba(143,164,184,0.06)',
                color: 'rgba(200,216,232,0.1)',
              },
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: '#8fa4b8' }} />
            ) : (
              <SendIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default AiChat;

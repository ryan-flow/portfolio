import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, TextField, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { education, githubUser, repos } from '../data/repos';

const WORKER_URL = '/api/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  { label: '凭证怎么匹配？', prompt: '财务 OA 匹配到多张同额凭证时怎么处理？归档抽查和金蝶上传分别怎么验收？' },
  { label: '预算怎么重算？', prompt: '投手想锁定几款商品的预算，投流助手怎样比较方案？谁决定最后的执行目标？' },
  { label: '模型回答怎么核对？', prompt: 'GEO 怎么让运营核对模型回答的依据？哪些检测做过内测？' },
  { label: '为什么选 FDE？', prompt: '你的求职方向是什么？选一个做过的项目，说明它和前线部署工程的关系。' },
  { label: '本科与毕业设计', prompt: '你的本科背景是什么？毕业设计做了什么？' },
];

const PUBLIC_BACKGROUND = [
  '以下是王子轩当前作品集的公开资料。回答项目和教育问题时请以这些资料为准，资料不足时请说明。',
  `求职方向是${githubUser.jobTarget}，意指 Forward Deployed Engineer。这是目标岗位，正式职称与客户驻场经历未提供。`,
  ...education.map(({ school, degree, major, period }) => [school, degree, major, period].join(' · ')),
  ...repos.map(({ displayName, description, rationale, verification, techStack }) =>
    `${displayName}，${description}${rationale}${verification ?? ''}（${techStack.join('、')}）`,
  ),
].join('\n');

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
        body: JSON.stringify({
          message: `${PUBLIC_BACKGROUND}\n\n访客提问\n${trimmed}`,
        }),
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
    const { isComposing, keyCode } = e.nativeEvent;
    if (e.key === 'Enter' && !e.shiftKey && !isComposing && keyCode !== 229) {
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
          {/* Empty state — clean welcome */}
          {messages.length === 0 && (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              {/* Greeting */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.8rem' },
                    fontWeight: 700,
                    color: '#e8e0d0',
                    mb: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  想聊哪个项目？
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.82rem', sm: '0.88rem' },
                    color: 'rgba(255,255,255,0.3)',
                    lineHeight: 1.6,
                  }}
                >
                  可以从一次技术取舍问起，也可以聊我的求职方向。
                </Typography>
              </Box>

              {/* Prompt cards — 2-column grid, clearly interactive */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 1.5,
                  width: '100%',
                  maxWidth: 480,
                }}
              >
                {QUICK_PROMPTS.map((qp) => (
                  <Box
                    key={qp.label}
                    component="button"
                    onClick={() => !loading && sendMessage(qp.prompt)}
                    disabled={loading}
                    sx={{
                      all: 'unset',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      border: '1px solid rgba(143,164,184,0.10)',
                      backgroundColor: 'rgba(143,164,184,0.03)',
                      cursor: loading ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: loading ? 0.4 : 1,
                      '&:hover': {
                        backgroundColor: 'rgba(143,164,184,0.08)',
                        borderColor: 'rgba(143,164,184,0.22)',
                        transform: 'translateY(-1px)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#8ba8c0',
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.55)',
                        fontWeight: 500,
                        textAlign: 'left',
                        lineHeight: 1.4,
                        '&:hover': { color: '#e8e0d0' },
                      }}
                    >
                      {qp.label}
                    </Typography>
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

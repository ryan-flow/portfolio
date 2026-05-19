# ink-studio → AI 水墨诗画 改造提示词

> 给另一个 Agent 执行。下方为完整任务描述，可直接复制使用。

---

## 任务目标

将 `oldking-yes/ink-studio` 从纯前端水墨艺术项目升级为 **「AI 驱动的水墨诗画生成器」**，使其从"前端实验"转变为"AI 应用"，与个人作品集中其他三个 AI 项目形成统一叙事线。

## 当前项目状态

- **仓库**：`https://github.com/oldking-yes/ink-studio`
- **结构**：单个 `index.html` 文件，2508 行，80KB
- **部署**：GitHub Pages（纯静态）
- **已有功能**：
  - 5 套水墨主题配色（墨韵/青花/金碧/朱砂/雪景）
  - SVG 动态背景（山脉、竹林、仙鹤、锦鲤、墨滴、飞花）
  - Canvas 题诗作画模块（4 模板：山水/竹/荷/泼墨）
  - 竖排题诗 + 印章系统 + PNG 一键导出
  - Web Audio 古琴泛音音景（5 段，滚动切换）
  - 素笺留墨留言墙（localStorage）
  - 自定义光标 + 墨迹拖尾 + 点击涟漪
  - 数据统计（访问量/作画数/留言数/在线时长）

## 改造内容

### 1. 新增 Cloudflare Worker（后端 API 代理）

创建一个新文件 `worker/ai-poem.js`：

```
功能：接收前端 POST 请求 → 调用 DeepSeek API → 返回 AI 生成的题画诗
端点：POST /api/poem
入参：{ prompt: string, style?: '五言'|'七言'|'词' }
返回：{ poem: string, title: string, author: string }
```

**Worker 代码要求：**
- 使用 Cloudflare Workers 原生 `fetch`，无需额外依赖
- DeepSeek API：`https://api.deepseek.com/v1/chat/completions`，model: `deepseek-chat`
- System prompt：专业古典诗词创作者，根据用户输入的关键词或情绪，创作一首完整的题画诗
- 返回格式必须为 JSON：`{ poem: "诗句内容", title: "标题", author: "AI墨客" }`
- API key 通过 Cloudflare Workers 环境变量 `DEEPSEEK_API_KEY` 注入，不可写死在前端
- 添加 CORS 头允许 `oldking-yes.github.io` 跨域访问
- `wrangler.toml` 配置文件一并创建

**部署指南（单独输出到 `worker/README.md`）：**
```bash
npx wrangler login
npx wrangler deploy
# 在 Cloudflare Dashboard → Workers → Settings → Variables 中添加 DEEPSEEK_API_KEY
```

### 2. 前端改造（修改 index.html）

#### 2.1 新增 AI 题诗入口

在题诗作画区域（`#poetry` section）新增一个 AI 输入组件：

```html
<!-- 放在主题选择器和题诗输入框之间 -->
<div class="ai-input-group">
  <input type="text" id="aiPrompt" placeholder="输入关键词或情绪，如「秋思」「离别」「江南烟雨」…" />
  <button id="aiGenerateBtn">🖌 AI 题诗</button>
  <div id="aiLoading" class="ai-loading" style="display:none">水墨研墨中…</div>
</div>
```

CSS 样式：
- 输入框与现有设计语言一致（米白宣纸底色，暗色文字）
- AI 生成按钮使用印章红色 `#8a2510`，hover 加深
- 加载动画使用毛笔 SVG 图标旋转或墨滴扩散效果
- `@media (max-width: 768px)` 下输入框和按钮各占 100% 宽度

#### 2.2 AI 调用逻辑（新增到现有 `<script>` 块中）

```javascript
// AI 题诗生成
const AI_WORKER_URL = 'https://ai-poem.你的子域名.workers.dev/api/poem';

async function generatePoem() {
  const prompt = document.getElementById('aiPrompt').value.trim();
  if (!prompt) { alert('请先输入诗词主题'); return; }

  const btn = document.getElementById('aiGenerateBtn');
  const loader = document.getElementById('aiLoading');
  btn.disabled = true;
  loader.style.display = 'block';

  try {
    const res = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, style: '五言' })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // 自动填入题诗表单
    document.getElementById('poemTitle').value = data.title || '';
    document.getElementById('poemText').value = data.poem || '';
    document.getElementById('poemAuthor').value = data.author || 'AI墨客';
    renderPoem();

  } catch (err) {
    console.error('AI 题诗失败:', err);
    alert('研墨失败，请稍后再试');
  } finally {
    btn.disabled = false;
    loader.style.display = 'none';
  }
}

document.getElementById('aiGenerateBtn').addEventListener('click', generatePoem);
// 回车也能触发
document.getElementById('aiPrompt').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generatePoem();
});
```

#### 2.3 页面文案更新

- `<title>` 改为：`墨韵 · AI 生成水墨诗画`
- `<meta description>` 改为：`AI 生成水墨诗画 — 输入关键词，AI 创作题画诗，Canvas 实时渲染为水墨画`
- Hero 标题从「题诗作画」改为「AI 题诗 · 墨韵生成」
- Hero 副标题加入 AI 说明

#### 2.4 统计更新

在 `updateStats()` 中新增 `AI 生成次数` 统计：
```javascript
document.getElementById('statAiGenerations').textContent = 
  JSON.parse(localStorage.getItem('ink-data') || '{"ai":0}').ai || 0;
```
在 AI 生成成功后：
```javascript
const data = JSON.parse(localStorage.getItem('ink-data') || '{}');
data.ai = (data.ai || 0) + 1;
localStorage.setItem('ink-data', JSON.stringify(data));
updateStats();
```

### 3. 作品集数据更新

更新 `portfolio/src/data/repos.ts` 中 ink-studio 的条目：

```typescript
{
  name: 'ink-studio',
  displayName: '墨韵 · AI 水墨',
  description:
    'AI 驱动的水墨诗画生成器——输入关键词 → DeepSeek 创作诗句 → Canvas 实时渲染水墨画。',
  rationale:
    '[AI创意] Cloudflare Worker 代理 DeepSeek API 生成古诗词，Canvas 2D 实时渲染为水墨题画（4 模板+印章系统+PNG 导出）。纯静态 GitHub Pages 部署 + Worker 边缘计算架构，SVG 动态水墨背景（山脉/竹林/仙鹤/墨滴）+ Web Audio 古琴音景。',
  techStack: ['DeepSeek API', 'Cloudflare Workers', 'Canvas 2D', 'SVG', 'Web Audio API', 'GitHub Pages'],
  // 其他字段不变
}
```

### 4. 不修改的部分

以下内容保持原样，不删除也不修改：
- SVG 动态背景引擎（InkBlobEngine）
- Canvas 题诗作画核心逻辑（drawThumbnail / renderPoem / exportPoem）
- 5 主题配色系统
- Web Audio 琴韵音景
- 留言墙 / 加载画面 / 滚动进度条 / 自定义光标

## 文件清单

改造后新增/修改的文件：

```
ink-studio/
├── index.html          ← 修改（AI 入口 + 调用逻辑 + 文案）
├── worker/
│   ├── ai-poem.js      ← 新增（Cloudflare Worker）
│   ├── wrangler.toml   ← 新增（Worker 配置）
│   └── README.md       ← 新增（部署指南）
├── README.md           ← 修改（更新项目描述）
└── DEPLOY.md           ← 不修改
```

## 验收标准

1. 本地用 Live Server 打开 `index.html`，输入「秋思」→ 点击「AI 题诗」→ 调用 Worker 成功返回诗句 → Canvas 自动渲染
2. Worker 部署到 Cloudflare 后，`curl -X POST https://xxx.workers.dev/api/poem -d '{"prompt":"秋思"}'` 返回 JSON
3. GitHub Pages 部署后功能正常（Worker CORS 已配好）
4. 作品集 repos.ts 中 ink-studio 条目已更新
5. 无 console 错误，API key 从未出现在前端代码中

---

**下一步**：将此提示词发给另一个 Agent，让它按步骤执行改造。

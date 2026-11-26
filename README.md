# 王子轩 · 求职作品集

我在广州做全栈开发，求职方向是前线部署全栈工程师（Forward Deployed Engineer）。作品集记录了我怎样和财务、投手及品牌运营一起把业务规则做进软件，以及交付后怎样核对结果。

[个人站](https://ryanflow.cloud/) · [网页版简历](https://ryanflow.cloud/resume.html) · [PDF 简历](https://ryanflow.cloud/resume.pdf)

## 工作作品

| 项目 | 我负责的工作 |
| --- | --- |
| [财务 OA 收集助手](https://ryanflow.cloud/#work-finance-oa) | 多套 OA 归档、金蝶凭证匹配及附件上传后的回读校验 |
| [LAVEDA AI 投流助手](https://ryanflow.cloud/#work-ad-assistant) | 锁定商品预算、比较分配方案及桌面端投期保存 |
| [GEO 品牌曝光检测](https://ryanflow.cloud/#work-geo) | 多模型任务队列、按题保存原回答与引用 |
| [微信立减金中台](https://ryanflow.cloud/#work-voucher) | 同步微信券批次，以核销回调和次日账单对账 |
| [LAVEDA 企业官网](https://ryanflow.cloud/#work-laveda) | 官网设计、GSAP 滚动交互和移动端布局 |
| [万表 Vanby 官网案例页](https://ryanflow.cloud/#work-vanby) | 产品图的选取、响应式展示及案例页制作 |

本科毕业设计是[非遗文化智能导览平台](https://github.com/ryan-flow/heritage-crs-platform)，包含对话推荐、网页和微信小程序。

## 本地开发

使用 Node.js 24，从仓库根目录运行以下命令。

```sh
npm ci
npm run dev
```

项目使用 React、TypeScript、Vite、MUI 和 GSAP。项目资料在 `src/data/repos.ts`，纵向作品展示在 `src/components/Projects.tsx`。

## 构建与部署

```sh
npm run build
npm run preview
```

正式站使用 Vercel。首页通过同源 `/api/chat` 访问流式问答服务。网页版简历、按同一页面导出的 PDF 及预览图位于 `public/`。

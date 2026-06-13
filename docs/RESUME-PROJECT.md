# 简历项目维护文档

> 此文档记录简历项目的结构、版本历史和维护指南，确保项目可长期维护。

## 项目结构

```
public/
├── resume.html          # 简历 HTML 源文件（主版本）
├── resume.pdf           # 简历 PDF 版本（从 HTML 生成）
├── resume-preview.png   # 简历预览图（从 HTML 截图生成）
├── photo.jpg            # 证件照
├── ryanflow-cloud-qr.png        # 个人网站二维码
└── ryanflow-cloud-qr-with-text.png  # 带中文文字的二维码
```

## 简历版本说明

### 当前使用版本
- **文件**: `public/resume.html`
- **布局**: 证件照在左上角，联系方式在右侧，二维码在右上角
- **求职方向**: AI 产品经理
- **项目内容**: CRS 非遗推荐、PRD-RAG、炼化自己

### 旧版本（已废弃）
- 居中布局版本（"王子轩 Zixuan Wang"居中显示）
- 项目内容不同（CRS推荐系统、AI人格克隆、AI人格测试、墨韵AI水墨）

## 布局结构

```
┌─────────────────────────────────────────────────┐
│ [证件照]   AI 产品经理 · AI PRODUCT MANAGER     [二维码]
│           王子轩                                  扫码查看我的网站
│           男·22岁·广州                           │
│           152-1982-8480  2919178903@qq.com        │
│           github.com/ryan-flow                   │
├─────────────────────────────────────────────────┤
│ 个人总结                                          │
│ 核心优势（2列网格）                                │
│ 项目经历（3个项目）                                │
│ 教育背景                                          │
│ 技能（2列网格）                                    │
└─────────────────────────────────────────────────┘
```

## 维护指南

### 修改联系信息
编辑 `public/resume.html`，搜索替换：
- 邮箱: `2919178903@qq.com`
- GitHub: `github.com/ryan-flow`
- 电话: `152-1982-8480`

### 修改年龄
搜索 `22岁` 替换为新年龄。

### 更新证件照
1. 将新照片保存为 `public/photo.jpg`
2. 确保 `resume.html` 中的 `<img src="photo.jpg"` 引用正确
3. 照片裁剪通过 CSS `object-position` 控制（当前值: `center 25%`）

### 更新二维码
1. 更新 `public/ryanflow-cloud-qr.png`
2. 确保 `resume.html` 中的引用正确

### 更新项目内容
编辑 `public/resume.html` 中的 `.proj` 部分。

## 部署

- **平台**: Vercel
- **域名**: ryanflow.cloud
- **仓库**: github.com/ryan-flow/portfolio
- **触发**: 推送到 main 分支自动部署

## 相关链接

- 在线简历: https://ryanflow.cloud/resume.html
- 简历 PDF: https://ryanflow.cloud/resume.pdf
- 个人网站: https://ryanflow.cloud
- GitHub: https://github.com/ryan-flow

## 更新记录

| 日期 | 更新内容 |
|------|---------|
| 2026-06-13 | 添加证件照、二维码、中文文字；更新联系方式和年龄 |
| 2026-05-28 | 简历 HTML 自动缩放适配 |
| 2026-05-21 | 简历重构为求职名片卡片布局 |

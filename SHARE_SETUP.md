# 📤 分享功能配置指南

## 微信分享配置

### 1. 准备分享封面图

在 `public/images/` 目录下添加分享封面图：
- 文件名：`share-cover.jpg`
- 推荐尺寸：**1200x630px**（微信推荐比例 1.91:1）
- 文件大小：建议小于 200KB
- 内容建议：包含新人名字、婚礼日期、精美设计

### 2. 更新分享链接

部署后，需要更新 `index.html` 中的以下内容：

```html
<!-- 将 your-domain.com 替换为你的实际域名 -->
<meta property="og:url" content="https://your-domain.com" />
<meta property="og:image" content="https://your-domain.com/images/share-cover.jpg" />
<meta name="wechat:image" content="https://your-domain.com/images/share-cover.jpg" />
<meta name="qq:image" content="https://your-domain.com/images/share-cover.jpg" />
```

### 3. 微信分享调试

1. 使用微信开发者工具或微信内置浏览器打开页面
2. 点击右上角菜单 → 分享
3. 查看分享卡片效果

**注意**：微信分享卡片需要：
- 图片必须是 HTTPS 链接
- 图片尺寸符合要求
- 域名已备案（国内服务器）

### 4. 高级配置（可选）

如果需要自定义分享内容，可以使用微信 JS-SDK：

1. 注册微信公众平台账号
2. 获取 AppID 和 AppSecret
3. 配置 JS-SDK 权限
4. 在页面中引入微信 JS-SDK

详细步骤请参考：[微信 JS-SDK 文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

## 分享功能说明

### 当前支持的分享方式

1. **微信分享**
   - 提示用户在微信中点击右上角菜单分享
   - 分享卡片会显示配置的标题、描述和图片

2. **QQ分享**
   - 点击QQ图标，打开QQ分享窗口
   - 支持分享到QQ好友或QQ空间

3. **复制链接**
   - 一键复制当前页面链接
   - 可粘贴到任何地方分享

4. **原生分享**（移动端）
   - 支持系统原生分享功能
   - iOS Safari、Chrome Mobile 等浏览器支持

## 测试分享功能

1. 在移动端浏览器中打开页面
2. 点击右下角的分享按钮
3. 测试各种分享方式

## 常见问题

### Q: 微信分享卡片不显示图片？
A: 检查图片链接是否为 HTTPS，图片尺寸是否符合要求。

### Q: 分享链接不正确？
A: 确保 `index.html` 中的 `og:url` 已更新为实际域名。

### Q: 分享按钮不显示？
A: 检查浏览器控制台是否有错误，确保 ShareButton 组件已正确导入。


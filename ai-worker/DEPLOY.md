# 夜汤 AI 主持人：Cloudflare 部署

模型已配置为 doubao-seed-2-1-pro-260915，使用常规方舟 API（按量计费），不使用 Coding/Agent Plan 套餐接口。

## 1. 部署后端

1. 登录 https://dash.cloudflare.com/，进入 Workers & Pages，创建应用并导入 GitHub 仓库 sutao546-ship-it/yetang。
2. 应用名称使用 yetang-ai-host。
3. 根目录使用仓库根目录 /，构建命令留空，部署命令使用 npx --yes wrangler@4 deploy --config wrangler.jsonc。仓库根目录现已提供明确的后端入口，避免误发布 HTML 静态资源。
4. 发布后记录 https://yetang-ai-host.<你的子域>.workers.dev 地址。

配置文件会创建 HOST_LIMITER 绑定，每个来源 IP 每分钟约 12 次请求。此限制按 Cloudflare 节点计数，不是严格的全站费用上限。接口面向公开游戏，CORS 不是用户身份认证，请同时在方舟控制台管理调用预算和额度。

## 2. 添加密钥

进入该 Worker 的 Settings → Variables and Secrets，添加类型为 Secret 的变量：

- 名称：ARK_API_KEY
- 值：你在方舟常规模型服务中创建的 API Key（不要使用 Plan 套餐密钥）

保存并部署。不要把密钥放进 GitHub、网页、聊天或 wrangler.jsonc。

ARK_MODEL 已设为 doubao-seed-2-1-pro-260915。请先在方舟账户中开通该模型。
打开 Worker 地址后的 /health，configured 为 true 只表示密钥和限流绑定已配置，不代表已经验证模型权限。

## 3. 连接游戏

将 Worker 的公开网址发给协作者（不是 API Key），或修改根目录 ai-host.json：

{"endpoint":"https://yetang-ai-host.<你的子域>.workers.dev/api/host"}

更新 GitHub Pages 后，用新建会话打开游戏并提问。真实调用成功后才能确认整个接入完成。
目前 endpoint 留空，在线游戏仍使用预设问答。离线 HTML 始终保留预设问答。

## 行为与限制

- 支持中韩文和自制案件。每次发送当前汤面、汤底、问题及最多 12 轮问答。
- 模型只允许返回 yes/no/irrelevant/unknown；服务端不转发自由文本或思考过程。
- 故事本身不明确时提示信息不足，不编造案情。
- 请求失败明确提示，不伪装成 AI 回答。切换案件会取消请求并清空上下文。
- 现有静态游戏已包含汤底，无法防止玩家查看网页源码；此方案防止对话直接泄露完整汤底。
- 本地校验：node --test worker.test.mjs。测试使用模拟模型响应，不产生真实调用费用。

官方参考：
- https://developers.cloudflare.com/workers/get-started/dashboard/
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
- https://docs.volcengine.com/docs/ark/model-list?lang=en

## 如果域名打开的是游戏网页，而 /health 返回 404

说明目前部署的是静态页面，后端尚未运行。到 Cloudflare 应用的构建设置，把根目录设为 /，部署命令设为 npx --yes wrangler@4 deploy --config wrangler.jsonc，然后重新部署最新提交。不要使用仅上传静态资源的命令。若使用手动上传创建的应用，可连接此 GitHub 仓库并按上述配置部署；保留现有 ARK_API_KEY Secret。

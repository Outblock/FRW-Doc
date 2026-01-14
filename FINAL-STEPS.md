# 最后一步：修复 Source 配置

## 当前状态

✅ **95% 完成**
- 所有内容已转换为 MDX
- 所有资源已迁移
- 主页正常工作
- Fumadocs MDX 自动生成了 `.source/` 目录

❌ **最后 5%**: `/docs` 路由的 source 配置

## 问题

错误：`TypeError: config.pages is not iterable` 或 `Cannot read properties of undefined (reading 'startsWith')`

位置：`app/source.ts`

## 可用的资源

`.source/server.ts` 已自动生成，包含：
```typescript
export const docs = await create.doc("docs", "content", {...});
export const meta = await create.meta("meta", "content", {...});
```

## 解决方案选项

### 选项 1：使用 Fumadocs 官方 API (推荐)

参考 Fumadocs 官方文档：
- https://fumadocs.vercel.app/docs/headless/source-api
- https://fumadocs.vercel.app/docs/mdx/source

查找正确的 `loader()` 或 `source()` 配置方式。

### 选项 2：使用简化配置

创建一个最小化的 source 配置：

```typescript
//app/source.ts
import { docs, meta } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export default loader({
  baseUrl: '/docs',
  // 尝试不同的 source 格式
  source: /* 需要正确的格式 */
});
```

### 选项 3：参考 Fumadocs 示例

查看 Fumadocs 的官方示例仓库：
- https://github.com/fuma-nama/fumadocs/tree/main/examples

找到与我们配置相似的示例。

### 选项 4：使用 Fumadocs CLI

```bash
bunx create-fumadocs-app temp-project
# 检查生成的 source.ts 配置
# 复制正确的配置到我们的项目
```

## 测试命令

```bash
# 测试主页（应该工作）
curl http://localhost:3000

# 测试文档页面（需要修复）
curl http://localhost:3000/docs

# 在浏览器中测试
open http://localhost:3000
open http://localhost:3000/docs
```

## 相关文件

- `app/source.ts` - 需要修复的源配置
- `.source/server.ts` - 自动生成的数据源
- `source.config.ts` - MDX 集合定义
- `fumadocs.config.ts` - Fumadocs 配置
- `app/docs/layout.tsx` - 使用 source.pageTree
- `app/docs/[[...slug]]/page.tsx` - 使用 source.getPage()

## 成功后

一旦配置正确，所有文档页面将正常工作：
- `/docs` - 文档首页
- `/docs/features/account-linking` - 功能页面
- `/docs/tutorial/*` - 教程页面
- 等等...

## 项目已完成的部分

✅ 项目结构
✅ 内容转换（33个文件）
✅ 资源迁移
✅ Tailwind CSS v4 配置
✅ Next.js 16 配置
✅ TypeScript 配置
✅ 导航结构（meta.json 文件）
✅ 主页
✅ 文档布局
✅ MDX 自动生成

只需要修复 `app/source.ts` 中的配置即可！

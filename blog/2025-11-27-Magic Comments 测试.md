---
slug: Magic-Comments-Test
title: Magic Comments 测试
date: 2025-11-27
authors: lidaqian
tags: [Docusaurus, Magic Comments]
keywords: [Docusaurus, Magic Comments]
---

<!-- truncate -->

# Magic Comments 测试

下面的代码块用于测试 Docusaurus 的 Prism magicComments 配置效果。

## add-start / add-end

```js title="add-example.js"
// add-start
console.log('这行会被高亮为添加');
// add-end
console.log('普通行');
```

## delete-start / delete-end

```js title="delete-example.js"
// delete-start
console.log('这行会被高亮为删除');
// delete-end
console.log('普通行');
```

## edit-start / edit-end

```js title="edit-example.js"
// edit-start
console.log('这行会被高亮为编辑');
// edit-end
console.log('普通行');
```

## highlight-start / highlight-end

```js title="highlight-example.js"
// highlight-start
console.log('这行会被高亮');
// highlight-end
console.log('普通行');
```

## error

```js title="error-example.js"
console.log('Hello World')
// This will error
throw new Error('Test error')
```

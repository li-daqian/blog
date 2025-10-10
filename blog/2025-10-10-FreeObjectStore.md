---
slug: free-object-store
title: 免费的对象存储服务
date: 2025-10-10
authors: lidaqian
tags: [Cloud, Object Storage]
keywords: [Cloud, Object Storage, Free]
---

<!-- truncate -->
## 前言
最近弄了个人网站，想找个免费的对象存储服务来存放图片和静态资源。经过一番搜索发现我们有不少选择，其中`Cloudflare R2`最适合我，因为我的域名和CDN都在Cloudflare上，这样我的服务可以集中在一个平台上管理。

## 正文
开始教你如何使用`Cloudflare R2`存储对象。

首先非常重要的一点！！！看下收费说明哦，官方文档上写了10GB/月免费存储，Class A 操作100万次免费，Class B 操作1000万次免费，访问流量全部免费。完全够用了。

1. 在Cloudflare注册账号并登录
2. 在Dashboard中的左侧菜单中选择`R2 object storage`。
3. 点击`Create bucket`创建一个新的存储桶
    - 输入存储桶名称
    - Location选默认即可，本人默认到了亚太地区(Asia Pacific)
    - Default Storage Class选默认即可(Standard)，Infrequent Access适合存一些归档数据
4. 创建完成后，点击存储桶名称进入存储桶详情页面
5. 点击上传按钮上传文件，或者使用API上传文件
6. 在设置页面中，配置访问域名，不用配置CNAME，直接使用Cloudflare提供的域名即可

下面是相关截图：
![左侧菜单入口](https://img.lidaqian.me/d9c313809e5ac148fc39feff532f0fee.png)
![创建存储桶截图](https://img.lidaqian.me/52a6a8a983772d3512faf14d1dbb0a1.png)
![自定义域名](https://img.lidaqian.me/d9c313809e5ac148fc39feff532f0few.png)

## 总结
很开心我有了一个免费的对象存储服务，`Cloudflare`棒棒哒，推荐给大家。
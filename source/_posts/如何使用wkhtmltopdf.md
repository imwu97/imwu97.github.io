---
title: 如何使用wkhtmltopdf
date: 2025-06-07 17:40:50
tags: [wkhtmltopdf]
---
wkhtmltopdf 是一个开源的命令行工具，基于 Qt WebKit 渲染引擎，可将 HTML 网页或本地 HTML 文件转换为高质量的 PDF 文档。
<!-- more -->



- 官网下载地址：[https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html)




### 基础命令格式

```bash
wkhtmltopdf [选项] <输入源> <输出PDF路径>
```

  - 输入源：URL（如 `https://example.com`）或本地 HTML 文件路径（如 `report.html`）
  - 实例：

```bash
wkhtmltopdf --page-size A4 https://baidu.com baidu.pdf #网页转PDF
```



### 常用高级选项

|        选项         |           作用           |                          示例                          |
| :-----------------: | :----------------------: | :----------------------------------------------------: |
|    --header-html    |        自定义页眉        |               --header-html header.html                |
|    --footer-html    |        自定义页脚        |               --footer-html footer.html                |
| --enable-javascript |     启用 Javascript      |      --enable-javascript --javascript-delay 5000       |
|      --cookie       | 传递 Cookie 访问权限页面 |             --cookie "sessionid" "abc123"              |
|         toc         |        生成目录页        | wkhtmltopdf toc chapter1.html chapter2.html manual.pdf |


---
title: 如何使用xlsxwriter
date: 2025-06-07 18:07:07
tags: [xlsxwriter]
categories: [php]
---

`xlsxwriter` 是一个 `PHP` `C` 扩展，可用于将文本、数字、公式和超链接写入 `Excel 2007` + `XLSX` 文件中的多个工作表。

<!-- more -->



- [官方文档](https://xlswriter-docs.viest.me/)



### 📌 一、核心特点

1. **轻量高效**
   - 专为低内存占用设计，可处理超过 10 万行数据。
   - 仅依赖 zlib 库，无需复杂环境。
2. **功能覆盖**
   - **基础操作**：支持多工作表、文本/数字/日期/货币格式、简单公式（如 `SUM`）。
   - **样式设置**：可定义字体、颜色、边框、对齐方式及单元格背景色。
   - **高级特性**：合并单元格、冻结窗格、超链接、基础图表。
3. **兼容性**
   - 支持 PHP 7.0+ 及 UTF-8 编码，确保多语言兼容。



------

### ⚙️ 二、安装方法

1.  **源码编译安装**

   ```bash
   # 下载源码
   wget https://pecl.php.net/get/xlswriter-1.4.0.tgz
   tar -zxvf xlswriter-1.4.0.tgz
   cd xlswriter-1.4.0
   # 编译安装
   phpize
   ./configure --with-php-config=/path/to/php-config
   make && make install
   # 启用扩展
   echo "extension=xlswriter.so" >> php.ini
   ```

   

------

### 📄 三、基础使用示例

```php
require 'vendor/autoload.php';
use XLSXWriter;

// 初始化
$writer = new XLSXWriter();

// 定义表头和数据
$header = ['姓名', '年龄', '城市'];
$data = [
    ['Alice', 30, '纽约'],
    ['Bob', 25, '洛杉矶']
];

// 写入数据
$writer->writeSheet($data, 'Sheet1', $header);
$writer->writeToFile('example.xlsx');
```



------

### 🎨 四、样式设置

通过 `addFormat()` 自定义样式，并应用于单元格：

```php
// 创建格式（红色字体、黄色背景、居中加粗）
$style = $writer->addFormat([
    'font_color' => '#FF0000',
    'bg_color' => '#FFFF00',
    'bold' => true,
    'align' => 'center',
    'border' => 1
]);

// 应用样式
$writer->writeSheetRow('Sheet1', ['重要数据'], $style);
```



------

### ⚡️ 五、性能对比优势

- **速度**：生成 20 列 × 10 万行数据时，速度比 PhpSpreadsheet 快 10 倍以上。
- **内存占用**：采用流式写入，峰值内存消耗仅为 PhpSpreadsheet 的 1/5。

------

### 💼 六、适用场景

- **大数据报表**：财务统计、日志分析等需导出海量数据的场景。
- **框架集成**：与 Laravel/Symfony 结合，快速实现数据导出功能。
- **资源受限环境**：服务器内存有限时仍能稳定运行。

> 💡 **提示**：若需复杂 Excel 操作（如读取/修改文件、高级图表），建议使用功能更全面的 **PhpSpreadsheet**；若追求极致导出性能，Xlsxwriter 是首选。

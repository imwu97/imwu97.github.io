---
title: Git 多账户配置 + SSH 密钥 + 连接问题
date: 2025-06-07 16:24:11
tags: [gitee, github]
categories: [git]
---

**“工欲善其事，必先利其器。” ——《论语》**
想象一下，`Gitee` 和 `GitHub` 是两个不同的“服务器城堡”，而 `SSH` 密钥就是你的“钥匙”。为了安全起见，咱们得给它们各配一把不同的钥匙，免得串门时搞混，不然 **“城门失火，殃及池鱼”**，提交代码时可能会串账号！

<!-- more -->

## 🚀 第一部分：生成 SSH 密钥（给 Gitee 和 GitHub 各配一把钥匙）

> 「工欲善其事，必先利其器。」 ——《论语》

### 步骤 1：生成 Gitee 的 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "demo@163.com" -f ~/.ssh/id_ed25519_gitee
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`Saving key "~/.ssh/id_ed25519_gitee" failed: No such file or directory`
   - 原因：`~/.ssh/` 目录不存在
   - 解决方案：手动创建 `.ssh` 文件夹
2. ❌ 错误：权限被拒绝（ `Permission denied` ）
   - 原因：可能是权限问题（ `Windows` 较少见）
   - 解决方案：以管理员身份运行 `Git Bash` 再试一次
3. ✅ 成功标志：终端显示 `Your identification has been saved...`，说明密钥已生成！

### 步骤 2：生成 GitHub 的 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "demo@163.com" -f ~/.ssh/id_ed25519_github
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`id_ed25519_github` 已存在
   - 原因：之前可能生成过同名密钥
   - 解决方案：
     - 要么换一个文件名（如 `id_ed25519_github_new` ）
     - 要么删除旧密钥（谨慎操作！确保已备份公钥）
2. ✅ 成功标志：终端显示 `Your identification has been saved...`，说明 `GitHub` 密钥也搞定了！

**「一把钥匙开一把锁，两把钥匙开两把锁，千万别串门！」 😆**

## 🔐 第二部分：把公钥插到 Gitee 和 GitHub 的钥匙孔里

> 「宝剑赠英雄，钥匙配锁孔。」

### 步骤 1：复制 Gitee 的公钥

```bash
cat ~/.ssh/id_ed25519_gitee.pub
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`No such file or directory`
   - 原因：密钥没生成成功，或者 `.ssh` 目录不存在
   - 解决方案：回到 `步骤 1` 重新生成密钥
2. ✅ 成功标志：终端显示一长串字符（你的公钥），复制它！

### 步骤 2：添加公钥到 Gitee

1. 登录 [https://gitee.com/](https://gitee.com/) → 设置 → `SSH` 公钥。
2. 粘贴公钥，保存。

#### 可能翻车点 & 解决方案

1. ❌ 错误：公钥格式错误
   - 原因：可能多复制了一行空格或换行符
   - 解决方案：重新复制，确保 完整粘贴（从 `ssh-ed25519` 开始到结尾）。
2.✅ 成功标志：`Gitee` 提示「公钥添加成功」！

**「Gitee 的门已开，接下来轮到 GitHub 了！」**

### 步骤 3：复制 GitHub 的公钥

```bash
cat ~/.ssh/id_ed25519_github.pub
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`No such file or directory`
   - 原因：`GitHub` 密钥没生成成功
   - 解决方案：回到 `步骤 2` 重新生成 `GitHub` 密钥
2. ✅ 成功标志：复制公钥，粘贴到 `GitHub` 的 `Settings` → `SSH and GPG keys`

**「GitHub 的门也开了，现在 Git 可以双平台横着走了！」 🚀**

## ⚙️ 第三部分：配置 SSH 的智能钥匙选择器（config 文件）

> 「运筹帷幄之中，决胜千里之外。」 ——《史记》

### 步骤 1：创建/编辑 ~/.ssh/config 文件

```bash
notepad ~/.ssh/config
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`config` 文件不存在
   - 原因：文件还没创建
   - 解决方案：直接新建文件，粘贴以下内容：
     ```json
      Host gitee.com
          HostName gitee.com
          User git
          IdentityFile ~/.ssh/id_ed25519_gitee

      Host github.com
          HostName github.com
          User git
          IdentityFile ~/.ssh/id_ed25519_github
     ```
2. ✅ 成功标志：保存文件，`Git` 现在能自动选择钥匙了！

**「智能管家已就位，钥匙选择不再愁！」 😎**

## 🔗 第四部分：测试 SSH 连接（看看钥匙能不能开门）

> 「是骡子是马，拉出来遛遛!」

### 步骤 1：测试 Gitee 连接

```bash
ssh -T git@gitee.com
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`The authenticity of host 'gitee.com (198.18.0.12)' can't be established.`
   - 原因：第一次连接 `Gitee` ，`Git` 不认识它的服务器指纹
   - 解决方案：输入 `yes` 并回车，信任它
2. ❌ 错误：`Permission denied (publickey)`
   - 原因：`SSH` 密钥没配对成功
   - 解决方案：
     - 检查 `~/.ssh/config` 是否配置正确
     - 确保 `Gitee` 的公钥已正确添加
3. ✅ 成功标志：`Hello demo！You've successfully authenticated...`

### 步骤 2：测试 GitHub 连接

```bash
ssh -T git@github.com
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`Permission denied (publickey)`
   - 原因：`GitHub` 的 `SSH` 密钥没配对成功
   - 解决方案：检查 `GitHub` 的公钥是否已添加
2. ✅ 成功标志：`Hi demo！You've successfully authenticated...`

**「两把钥匙，两扇门，Git 现在可以自由切换了！」 🎉**

## 📦 第五部分：克隆或初始化仓库（选择正确的门进入）

> 「条条大路通罗马，但咱得选对路!」

### 步骤 1：克隆 Gitee 仓库

```bash
git clone git@gitee.com:你的用户名/仓库名.git
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`Could not read from remote repository`
   - 原因：`SSH` 密钥没配对成功
   - 解决方案：重新测试 `ssh -T git@gitee.com`
2. ✅ 成功标志：仓库成功克隆到本地！

### 步骤 2：克隆 GitHub 仓库

```bash
git clone git@github.com:你的用户名/仓库名.git
```

#### 可能翻车点 & 解决方案

1. ❌ 错误：`Permission denied (publickey)`
   - 原因：`GitHub` 的 `SSH` 密钥没配对成功
   - 解决方案：检查 `GitHub` 的公钥是否已添加
2. ✅ 成功标志：仓库成功克隆！

**「左手 Gitee，右手 GitHub，Git 多账户配置，从此 so easy！」 🚀**


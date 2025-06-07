---
title: 如何给Github配置SSH密钥
date: 2025-06-07 16:24:11
tags: [git, github]
categories: [git]
---

提升 GitHub 操作安全性与便捷性！学习使用 SSH 密钥替代密码验证。本教程手把手教你生成强密钥、安全配置到 GitHub，并解决多账户管理问题，为你的代码仓库保驾护航！

<!-- more -->

# 1. 生成 SSH 密钥


```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- 参数说明：

  - `-t rsa`：使用 RSA 算法生成密钥 (也可选 ed25519，更安全)
  - `-b 4096`：指定密钥长度为 4096 位 (安全性更高)
  - `-C`：注释，一般填邮箱 (仅作标识，不影响功能)

- 操作提示：

  - 按回车使用默认路径（`~/.ssh/id_rsa`）
  - 设置密钥密码（可选，增加安全性但每次需输入）

- 生成文件：

  - 私钥：`id_rsa`（**切勿泄露**）
  - 公钥：`id_rsa.pub`（需添加到 GitHub）

- 多账户场景：

  若需为 Github 单独生成密钥，添加 `-f ~/.ssh/github_id_rsa` 指定文件名

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/github_id_rsa
```



## 2. 检测 SSH-agent 服务是否开启

- `Power Shell` 命令检测：

```powershell
Get-Service -Name ssh-agent
```

- 开启方式：
  - 打开**计算机管理** ➡**服务和应用程序**➡**服务**
  - 选中**OpenSSH Authentication Agent**➡右键**属性**
    - 启动类型：**自动**
    - 服务状态：**启动**
  - 点击 **确定**



# 3. 添加公钥到 Github 账户

## （1） 复制公钥内容

```bash
cat ~/.ssh/id_rsa.pub # 输出内容并复制
```

Windows 用户可直接用文本编辑器打开 `id_rsa.pub` 复制



## （2） 在 Github 添加密钥

- 登录GitHub ➡ 点击头像 ➡ **Settings** ➡ **SSH and GPG Keys**。
- 点击 **New SSH Key** ➡ 填写：
  - **Title**：自定义名称（如 `My Laptop`）。
  - **Key**：粘贴复制的公钥内容
- 点击 **Add SSH Key** 保存。



## （3） 配置多密钥管理（可选）

若需为不同平台（如：Github、Gitlab）使用不同密钥，需创建 `~/.ssh/config` 文件：

```yml
# Github 装用配置
Host github.com
	HostName github.com
	IdentityFile ~/.ssh/github_id_rsa  # 指向你的 GitHub 私钥
  PreferredAuthentications publickey
```



## （4） 测试 SSH 连接

```bash
ssh -T git@github.com
```

成功响应：Hi username! You've successfully authenticated, but GitHub does not provide shell access.

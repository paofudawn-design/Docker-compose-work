# Client-Server Application Scaffolding

## 项目概述

基于 **Node.js + Express.js + MongoDB** 构建的 RESTful API 服务，包含 JWT 认证和授权功能、ESLint 代码质量控制、Docker 容器化部署、以及完善的开发工具链配置。

本项目覆盖 **五个核心学习主题**：

### ✅ 标题一：VS Code 配置
- VS Code 开发环境配置
- 代码格式化设置（ESLint + Prettier）
- 扩展管理和快捷键配置
- 保存时自动格式化

### ✅ 标题二：Node.JS 平台
- Node.js 环境搭建（Express + Monk + Joi）
- npm 代理配置支持（`.npmrc` + `PROXY_SETUP.md`）
- 多环境配置（开发/生产）
- 项目部署（Docker Compose + Dockerfile）

### ✅ 标题三：探索 REST 服务
- REST API 端点文档
- 完整的 CRUD 操作（员工管理）
- API 测试（Apidog + curl）
- 统一的错误处理中间件

### ✅ 标题四：改进 REST 服务功能
- 时间戳中间件开发（`timeSign`）
- 用户管理控制器（JWT 认证 + 注册）
- 增强的认证和授权系统（RBAC）
- 高级查询（ID 范围、用户名查询）

### ✅ 标题五：探索自动代码质量控制
- ESLint 配置（AirBnB 风格）
- VS Code 集成（实时语法检查）
- 代码质量规则（缩进、引号、分号）
- 自动修复工作流

## 项目结构

```
Client-Server Application Scaffolding/
├── src/
│   ├── config/
│   │   └── jwt.js                 # JWT 配置和工具函数
│   ├── db/
│   │   ├── connection.js          # MongoDB 连接（Monk）
│   │   └── schema.js              # 数据验证模式（Joi）
│   ├── middlewares/
│   │   ├── auth.js                # 认证和授权中间件
│   │   ├── index.js               # 通用中间件
│   │   └── errorHandler.js        # 错误处理
│   ├── routes/
│   │   ├── auth.js                # 认证路由（注册/登录/账户）
│   │   ├── employees.js           # 员工路由（CRUD）
│   │   └── users.js               # 用户路由（查询/范围）
│   ├── ui-routes/
│   │   ├── index.js               # UI 路由
│   │   ├── public/                # 静态资源（CSS）
│   │   └── views/                 # EJS 模板
│   ├── app.js                     # Express 应用配置
│   └── server.js                  # 服务器入口
├── .env.example                   # 环境变量示例
├── .eslintrc.js                   # ESLint 配置
├── .gitignore                     # Git 忽略规则
├── .npmrc                         # NPM 代理配置
├── .vscode/settings.json          # VS Code 配置
├── Dockerfile                     # Docker 构建文件
├── docker-compose.yml             # Docker 编排配置
├── JHIPSTER_ENTITIES.jdl          # JHipster 实体定义
├── JHIPSTER_JDL_BLUEPRINT.jdl     # JHipster 应用蓝图
├── package.json                   # 项目依赖
├── PROXY_SETUP.md                 # 代理配置指南
├── PROXY_SETUP.md                 # 代理配置指南
├── QUICK_START.md                 # 快速开始指南
├── README.md                      # 本文件
├── TASK_COMPLETION_GUIDE.md       # 任务完成指南
├── FINAL_REPORT.md                # 最终报告
├── test-api.sh                    # API 测试脚本
├── verify-tasks.js                # 任务验证脚本
├── setup-proxy.sh                 # 代理设置脚本（Linux）
└── setup-proxy.bat                # 代理设置脚本（Windows）
```

## 快速开始

### 前置要求
- Node.js 14+
- MongoDB 4+（或 Docker）
- npm 6+

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env

# 3. 启动 MongoDB（使用 Docker）
docker-compose up -d mongo

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:8000
```

### API 端点

| 方法 | 端点 | 描述 | 认证 |
|------|------|------|------|
| POST | `/api/register` | 用户注册 | 无 |
| POST | `/api/authenticate` | 用户登录 | 无 |
| GET | `/api/authenticate` | 检查认证状态 | JWT |
| GET | `/api/account` | 获取当前账户 | JWT |
| GET | `/api/employees` | 获取所有员工 | JWT |
| GET | `/api/employees/jobs` | 获取所有职位 | JWT |
| GET | `/api/employees/:id` | 获取单个员工 | JWT |
| POST | `/api/employees` | 创建员工 | Admin |
| PUT | `/api/employees/:id` | 更新员工 | Admin |
| DELETE | `/api/employees/:id` | 删除员工 | Admin |
| GET | `/api/users` | 获取所有用户 | Admin |
| GET | `/api/users/jobs` | 获取所有职位 | JWT |
| GET | `/api/users/username/:username` | 按用户名查询 | JWT |
| GET | `/api/users/:id` | 按 ID 查询 | JWT |
| GET | `/api/users/range?start=&end=` | ID 范围查询 | Admin |

## 许可证

ISC

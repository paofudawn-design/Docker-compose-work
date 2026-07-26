# 快速开始指南

## 🚀 5分钟启动项目

### 步骤1: 准备环境
```bash
# 克隆项目（如果尚未克隆）
git clone https://github.com/NoctisRen/Client-Server-Scaffolding.git
cd Client-Server-Scaffolding

# 安装依赖
npm install
```

### 步骤2: 配置环境
```bash
# 复制环境配置文件
cp .env.example .env

# 或手动创建 .env 文件，内容如下：
# PORT=8000
# NODE_ENV=dev
# DB_URL=mongodb://localhost:27017/my-employees
# JWT_SECRET=your-secret-key
```

### 步骤3: 启动 MongoDB
```bash
# 方法1: 使用 Docker（推荐）
docker-compose up -d mongo

# 方法2: 本地安装 MongoDB
# 请参考 MongoDB 官方文档安装
```

### 步骤4: 启动应用
```bash
# 开发模式
npm run dev

# 或生产模式
npm run prod
```

### 步骤5: 验证运行
访问 http://localhost:8000 或运行：
```bash
curl http://localhost:8000/api/employees
```

## 📋 功能验证

### 1. 用户注册
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'
```

### 2. 用户登录
```bash
curl -X POST http://localhost:8000/api/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

保存返回的 `id_token` 用于后续请求。

### 3. 访问受保护 API
```bash
# 使用上一步获取的 token
TOKEN="your-jwt-token-here"

# 获取员工列表
curl -X GET http://localhost:8000/api/employees \
  -H "Authorization: Bearer $TOKEN"

# 创建新员工
curl -X POST http://localhost:8000/api/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "job": "Developer"
  }'
```

## 🛠️ 开发工具

### VS Code 配置
项目已预配置 VS Code 设置：
- 自动代码格式化
- ESLint 实时检查
- 保存时自动修复

### 代码质量检查
```bash
# 运行 ESLint
npm run lint

# 自动修复问题
npm run lint:fix
```

## 📁 项目结构速览

```
Client-Server Application Scaffolding/
├── src/                    # 源代码
│   ├── routes/            # API 路由
│   ├── middlewares/       # 中间件
│   ├── db/               # 数据库
│   └── config/           # 配置
├── .vscode/              # 编辑器配置
├── .env.example          # 环境配置
├── docker-compose.yml    # 容器部署
└── 各种文档和指南
```

## 🔧 常用命令

```bash
npm run dev              # 启动开发服务器
npm run prod             # 启动生产服务器
npm run lint             # 检查代码
npm run lint:fix         # 自动修复
docker-compose up -d     # 启动所有服务
docker-compose down      # 停止服务
./test-api.sh            # 运行功能测试
node verify-tasks.js     # 验证任务完成
```

## 🎯 任务完成验证

运行验证脚本确认所有任务已完成：
```bash
node verify-tasks.js
```

## 🎉 恭喜！
您已成功启动项目。现在可以：
1. 探索 API 端点
2. 修改代码并查看自动格式化
3. 部署到生产环境

享受编码！ 🚀

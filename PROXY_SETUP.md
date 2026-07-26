# NPM 代理配置说明

## 通过代理设置 npm 网络连接

如果您的网络需要通过代理访问互联网，可以使用以下命令配置 npm：

```bash
# 设置 HTTP 代理
npm config set proxy http://domain%5Cusername:pass%20word@192.168.40.21:8080

# 设置 HTTPS 代理
npm config set https-proxy http://domain%5Cusername:pass%20word@192.168.40.21:8080

# 清除代理设置
npm config delete proxy
npm config delete https-proxy
```

## 特殊字符说明
- `%20` 表示空格
- `%5C` 表示反斜杠 (`\`)

## 验证配置
```bash
# 查看当前配置
npm config list

# 测试连接
npm ping
```

## 项目特定配置
本项目已包含 `.npmrc` 文件，您可以根据需要修改代理设置。

## 备用方案：使用镜像源
如果代理配置复杂，可以考虑使用国内镜像源：

```bash
# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com/

# 恢复官方源
npm config set registry https://registry.npmjs.org/
```

## 环境变量配置
您也可以通过环境变量设置代理：

```bash
# Linux/macOS
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

# Windows (命令提示符)
set HTTP_PROXY=http://proxy.example.com:8080
set HTTPS_PROXY=http://proxy.example.com:8080
```

## 自动配置脚本
本项目提供了自动配置脚本：
- `setup-proxy.sh` - Linux/macOS 版本
- `setup-proxy.bat` - Windows 版本

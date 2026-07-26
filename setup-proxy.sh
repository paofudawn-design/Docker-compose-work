#!/bin/bash

# 代理设置脚本
# 用于演示如何通过代理配置 npm

echo "=== NPM 代理配置脚本 ==="
echo ""

# 显示当前配置
echo "当前 npm 配置："
npm config list | grep -E "(proxy|registry)"

echo ""
echo "请选择操作："
echo "1. 设置代理"
echo "2. 清除代理"
echo "3. 使用淘宝镜像"
echo "4. 恢复官方源"
echo "5. 退出"
echo ""

read -p "请输入选项 (1-5): " choice

case $choice in
    1)
        echo "设置代理配置..."
        echo "示例：http://domain%5Cusername:pass%20word@192.168.40.21:8080"
        read -p "请输入 HTTP 代理地址: " proxy_url
        
        if [ -n "$proxy_url" ]; then
            npm config set proxy "$proxy_url"
            npm config set https-proxy "$proxy_url"
            echo "代理设置完成"
        else
            echo "未输入代理地址，使用示例配置"
            npm config set proxy "http://domain%5Cusername:pass%20word@192.168.40.21:8080"
            npm config set https-proxy "http://domain%5Cusername:pass%20word@192.168.40.21:8080"
            echo "示例代理设置完成"
        fi
        ;;
    2)
        echo "清除代理配置..."
        npm config delete proxy
        npm config delete https-proxy
        echo "代理配置已清除"
        ;;
    3)
        echo "切换到淘宝镜像..."
        npm config set registry https://registry.npmmirror.com/
        echo "已切换到淘宝镜像"
        ;;
    4)
        echo "恢复官方源..."
        npm config set registry https://registry.npmjs.org/
        echo "已恢复官方源"
        ;;
    5)
        echo "退出脚本"
        exit 0
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "更新后的配置："
npm config list | grep -E "(proxy|registry)"

echo ""
echo "脚本执行完成"

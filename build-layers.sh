#!/bin/bash
# build-layers.sh - 构建 Lambda Layers

echo "🔨 开始构建 Lambda Layers..."

# 清理旧的 layers 目录
rm -rf layers
mkdir -p layers/nodejs/node_modules
mkdir -p layers/prisma/nodejs/node_modules/.prisma
mkdir -p layers/prisma/nodejs/node_modules/@prisma

# 1. 构建主要依赖层 (node_modules)
echo "📦 构建 NodeModules Layer..."
cp package.json package-lock.json layers/nodejs/
cd layers/nodejs
# 只安装生产依赖
npm ci --production --no-optional

# 移除不需要的文件以减小体积
find . -name "*.md" -type f -delete
find . -name "*.ts" -type f -delete
find . -name "*.map" -type f -delete
find . -name ".git" -type d -exec rm -rf {} +
find . -name "test" -type d -exec rm -rf {} +
find . -name "tests" -type d -exec rm -rf {} +
find . -name "docs" -type d -exec rm -rf {} +

cd ../..

# 2. 构建 Prisma 层
echo "🗄️ 构建 Prisma Layer..."
# 生成 Prisma Client
npx prisma generate --schema=./prisma/schema.prisma

# 复制 Prisma 相关文件
cp -r node_modules/.prisma layers/prisma/nodejs/node_modules/
cp -r node_modules/@prisma layers/prisma/nodejs/node_modules/

# 3. 准备 Lambda 函数代码
echo "🚀 准备 Lambda 函数代码..."
# 构建 NestJS 应用
npm run build

# 创建精简的部署包
mkdir -p deploy/dist
cp -r dist/* deploy/dist/
cp package.json deploy/

# 在部署目录中创建一个最小的 node_modules
cd deploy
mkdir -p node_modules
# 只复制 Lambda 运行时需要但不在 Layer 中的包
cd ..

echo "✅ Layer 构建完成！"
echo "📊 Layer 大小："
du -sh layers/nodejs
du -sh layers/prisma
du -sh deploy
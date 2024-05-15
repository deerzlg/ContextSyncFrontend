FROM node:18.19.1 as builder

# 准备工作目录
RUN mkdir -p /app/client
WORKDIR /app/client

# 复制源代码进node容器
COPY . /app/client/

# 设置淘宝镜像
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
# 安装项目依赖
RUN pnpm install

# 打包项目
RUN pnpm run build

# 构建最终镜像，nginx服务
FROM nginx:1.25-alpine as final

# Set a non-root user environment variable (used in base image)
ENV NGINX_USER=nginx
# Set the port environment variable
ENV PORT=80

# 自定义 nginx 设置文件
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建出来的文件
COPY --from=builder /app/client/dist /usr/share/nginx/html

# 添加运行权限
RUN chown nginx.nginx /usr/share/nginx/html/ -R
# 暴露端口
EXPOSE 80

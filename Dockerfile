FROM node:10.1
# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
COPY . /app
# 指定接下来的工作路径为/app
WORKDIR /app
RUN npm install
RUN npm run build
# 将容器 9000 端口暴露出来， 允许外部连接这个端口。
EXPOSE 9000
CMD npm run serve

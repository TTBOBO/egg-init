# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:10.16.0-alpine
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 创建app目录
RUN mkdir -p C:/Users/Administrator/Desktop/test-docker/docker

# 设置工作目录
WORKDIR C:/Users/Administrator/Desktop/test-docker/docker

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json C:/Users/Administrator/Desktop/init/egg-init/app-service/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
#RUN npm i --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录
COPY . C:/Users/Administrator/Desktop/test-docker/docker

# 暴露容器端口
EXPOSE 7002

# 启动node应用
CMD npm run dev
FROM docker.io/node
#RUN
# apk --update add tzdata \
  #  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
 #   && echo "Asia/Shanghai" > /etc/timezone \
 # && apk del tzdata
RUN mkdir -p /var/www/node-app/egg-init

WORKDIR /var/www/node-app/egg-init

COPY package.json /var/www/node-app/egg-init/package.json

RUN npm install -g cnpm --registry=http://r.cnpmjs.org
#RUN npm config set registry http://r.cnpmjs.org
#RUN cnpm install forever -g
RUN cnpm install --production

COPY . /var/www/node-app/egg-init
#RUN unzip -o /var/www/egg-init/admin-server/static.zip -d /var/www/egg-init/admin-server/static
EXPOSE 8082

CMD npm start
#CMD forever start --minUptime 1000 --spinSleepTime 1000 /var/www/node-app/egg-test/app.js 


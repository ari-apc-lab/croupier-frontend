FROM node:10.15.3
RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y npm
RUN apt-get install -y nginx
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app/
RUN npm install 
RUN npm audit fix
RUN npm run build:prod
RUN cp -r /usr/src/app/dist/* /usr/share/nginx/html

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"] 

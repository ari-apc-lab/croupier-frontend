FROM node:latest as build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt
COPY --from=build /usr/src/app/dist/*  /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY ./certs/cert.crt /etc/nginx/certs/cert.crt
# COPY ./certs/cert.key /etc/nginx/certs/cert.key
COPY ./certs /etc/letsencrypt/live/portal.hidalgo-project.eu/
# COPY ./certs/privkey.pem /etc/letsencrypt/live/portal.hidalgo-project.eu/privkey.pem
EXPOSE 80
EXPOSE 443
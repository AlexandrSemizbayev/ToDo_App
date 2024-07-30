FROM nginx:latest
RUN echo "👋 Hi, i am a frontend docker"
WORKDIR /app
COPY . .
COPY ./dist /srv/www/dist
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

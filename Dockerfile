FROM nginx
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY  ./dist/game-generator/ /usr/share/nginx/html

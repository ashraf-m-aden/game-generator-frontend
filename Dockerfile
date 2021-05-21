FROM nejishow/javanx
RUN pwd
COPY  ./dist/game-generator/ /usr/share/nginx/html

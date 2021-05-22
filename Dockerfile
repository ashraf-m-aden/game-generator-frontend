FROM nejishow/game-gen
WORKDIR /usr/share/nginx/html
RUN rm -r *
COPY  ./dist/game-generator/ /usr/share/nginx/html


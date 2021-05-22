FROM nejishow/game-gen
WORKDIR /usr/share/nginx/html
RUN rm -r *
COPY  ./dist/game-generator/ /usr/share/nginx/html
WORKDIR /app
RUN rm start.sh
COPY start.sh .
RUN  chmod a+x start.sh
CMD ["./start.sh"]


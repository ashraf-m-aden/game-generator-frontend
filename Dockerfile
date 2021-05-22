FROM nejishow/javanx
COPY  ./dist/game-generator/ /usr/share/nginx/html
WORKDIR /app
CMD ["./start.sh"]

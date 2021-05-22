FROM nejishow/game-gen
COPY  ./dist/game-generator/ /usr/share/nginx/html
WORKDIR /app
CMD ["./start.sh"]

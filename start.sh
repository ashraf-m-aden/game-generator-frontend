#!/bin/bash

sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' | /usr/bin/java -jar -Dserver.port=8089 game-0.0.1-SNAPSHOT.jar


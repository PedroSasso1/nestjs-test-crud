FROM node:18-slim

RUN apt install bash

WORKDIR /home/node/app

USER node
COPY --chown=node:node package.json package-lock.json* ./

CMD [ ".docker/start.sh" ]
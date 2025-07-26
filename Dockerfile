FROM node:22.17.1

WORKDIR /mindforge
COPY . .

ENV REDIS_PASSWORD=FUCKED_ATTACKER_666_BACK_MY_DATA


RUN npm install -g pnpm@9.15.9
RUN pnpm install
RUN pnpm build

EXPOSE 3000

# CMD ["node",".next/standalone/server.js"]
CMD ["node", ".output/server/index.mjs"]


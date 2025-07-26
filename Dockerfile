FROM node:22.17.1

WORKDIR /mindforge
COPY . .

ENV REDIS_PASSWORD=FUCKED_ATTACKER_666_BACK_MY_DATA

ENV NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJlZC1jb3JnaS03OC5jbGVyay5hY2NvdW50cy5kZXYk
ENV NUXT_CLERK_SECRET_KEY=sk_test_UeC4KS9W2aGIiUVL1h43XD5zAvuj8Xq00BsePgOe2B
ENV NUXT_API_URL=http://localhost:2999/


RUN npm install -g pnpm@9.15.9
RUN pnpm install
RUN pnpm build

EXPOSE 3000

# CMD ["node",".next/standalone/server.js"]
CMD ["node", ".output/server/index.mjs"]


FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD yarn start

# FROM node:18-alpine as runner
# WORKDIR /app
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/package-lock.json .
# COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# EXPOSE 3000
# ENTRYPOINT ["yarn", "start"]
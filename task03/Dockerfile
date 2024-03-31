FROM node:latest
WORKDIR /app
ADD package.json .
ADD package-lock.json .
RUN npm ci
ADD . .

RUN npx prisma generate

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ENTRYPOINT ["npm", "start"]
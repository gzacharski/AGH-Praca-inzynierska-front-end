FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json jsconfig.json ./
RUN npm install 
COPY public ./public
COPY src ./src
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve","-s","build"]
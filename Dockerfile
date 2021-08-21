FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json jsconfig.json ./
RUN npm install 
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
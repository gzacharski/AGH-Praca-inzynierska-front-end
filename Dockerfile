FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
EXPOSE 5000
CMD ["serve","-s","build"]
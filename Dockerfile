FROM node:14-alpine
WORKDIR /app
RUN mkdir build
COPY ./build ./build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve","-s","build"]
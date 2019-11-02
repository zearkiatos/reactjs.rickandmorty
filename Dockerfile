FROM node:12

COPY ["package.json","package-lock.json","/home/node/app/"]

WORKDIR /home/node/app

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs

COPY [".","."]

CMD npm install -g create-react-app && \
    npm install && \
    sass src/components/styles/:src/components/styles --watch && \
    npm run start --port=5100 && \
    npm install -g nodemon | ng serve --host 0.0.0.0 --port 5000
EXPOSE 5100
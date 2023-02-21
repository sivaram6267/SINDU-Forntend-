FROM node:16.15.0
WORKDIR app
COPY . .
EXPOSE 443
EXPOSE 80
COPY ./package.json /app
COPY ./src /app
RUN npm install
RUN npm run build
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["npm", "run","start"]

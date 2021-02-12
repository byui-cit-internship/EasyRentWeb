FROM node AS WEB_BUILD

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

FROM nginx

COPY --from=WEB_BUILD /app/build /usr/share/nginx/html/

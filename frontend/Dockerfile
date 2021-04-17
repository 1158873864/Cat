#FROM node:10
#COPY ./ /app
#WORKDIR /app
#RUN npm install && npm run build
FROM nginx
COPY dist/ /usr/share/nginx/mooctest-aiot/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

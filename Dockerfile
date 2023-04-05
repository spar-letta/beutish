FROM node:12-alpine3.12 As build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .


RUN npm run build


#prepare nginx
FROM nginx:1.19.0-alpine As prod-stage
COPY --from=build /app/build /usr/share/nginx/html/
COPY nginx/nginxbycmis.conf /etc/nginx/conf.d/nginxbycmis.conf 
COPY nginx/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80
CMD ["nginx","-g","daemon off;"]





#===========old code===========
# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY ./ ./
# COPY cert ./
# RUN npm i
# CMD ["npm", "run", "start"]

#============end code==============


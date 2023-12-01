FROM --platform=linux/amd64 node:14.18.3-alpine as srcBuild
ARG STAGE
WORKDIR /app
COPY ./ ./
RUN npm install --legacy-peer-deps
ARG ENV
RUN npm run build:$STAGE

ARG STAGE
FROM --platform=linux/amd64 nginx:alpine as server

WORKDIR /webapp
ARG STAGE
COPY --from=srcBuild ./app/dist ./dist
COPY --from=srcBuild ./app/source ./source

COPY ./nginx-$STAGE.conf /etc/nginx/nginx.conf
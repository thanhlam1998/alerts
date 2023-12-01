FROM node:14.18.3-alpine as srcBuild
ARG STAGE
WORKDIR /app
COPY ./ ./
RUN npm install
ARG ENV
RUN npm run build:$STAGE

FROM node:14.18.3-alpine
COPY --from=srcBuild /app/dist /
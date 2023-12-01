cd /home/ubuntu/app/bri-webapp
git checkout stage
git config pull.rebase false
git pull origin develop
COMPOSE_PROJECT_NAME=bri-web-stage STAGE=stage WEB_PORT=2002 docker compose up --build --detach
docker builder prune -f

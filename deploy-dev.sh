cd /home/ubuntu/app/bri-webapp
git checkout develop
git config pull.rebase false
git pull origin develop
COMPOSE_PROJECT_NAME=bri-web-dev STAGE=dev WEB_PORT=2001 docker compose up --build --detach
docker builder prune -f
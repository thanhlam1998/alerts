cd /home/ubuntu/app/bri-webapp
git checkout develop
git config pull.rebase false
git pull origin develop
COMPOSE_PROJECT_NAME=bri-web-prod STAGE=prod WEB_PORT=4001 docker compose up --build --detach
docker builder prune -f
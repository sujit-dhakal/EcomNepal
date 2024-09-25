#!/bin/bash

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'mkdir -p ~/ecom/deployment'

scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa ecom/docker-compose.yml $1@$2:~/ecom/deployment/docker-compose.yml

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 "echo $3 > ~/ecom/deployment/.env"

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'chmod 644 ~/ecom/deployment/docker-compose.yml'

cd ~/ecom/deployment

sudo apt-get update
sudo apt-get install -y curl
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose" -o /usr/local/bin/docker-compose
udo chmod +x /usr/local/bin/docker-compose

docker-compose up -d

sleep 300

docker-compose down
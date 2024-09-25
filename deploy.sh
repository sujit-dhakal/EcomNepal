#!/bin/bash

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'mkdir -p ~/ecom/deployment'

scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa ecom/docker-compose.yml $1@$2:~/ecom/deployment/docker-compose.yml

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 "echo $3 > ~/ecom/deployment/.env"

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'chmod 644 ~/ecom/deployment/docker-compose.yml'

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'cd ~/ecom/deployment && docker-compose up -d'

sleep 300

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'cd ~/ecom/deployment && docker-compose down'
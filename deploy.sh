#!/bin/bash

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'mkdir -p ~/ecom/deployment'

scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa ecom/docker-compose.yml $1@$2:~/ecom/deployment/docker-compose.yml

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 "cat > ~/ecom/deployment/.env" << EOL
$3
EOL

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 "cat ~/ecom/deployment/.env"

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa $1@$2 'chmod 644 ~/ecom/deployment/docker-compose.yml'
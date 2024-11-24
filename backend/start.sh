#!/bin/bash 

docker-compose down 
docker-compose up --build
systemctl stop postgresql

docker-compose up

#!/bin/bash 

systemctl stop postgresql
docker-compose down -v
docker-compose up --build

docker-compose up

#!/bin/bash 

sudo docker-compose down 
sudo docker-compose up --build
systemctl stop postgresql

docker-compose up

#!/bin/bash 

systemctl stop postgresql
docker-compose down
docker-compose up

#!/bin/bash
cd /home/avipe/Projects/hello-app
git pull origin main
docker compose up -d --build

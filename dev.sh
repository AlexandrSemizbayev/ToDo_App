#!/bin/bash

docker-compose up --build
cd ./frontend
npm install
npm run dev
cd ../
#!/bin/bash
cd ./frontend
npm install
npx concurrently "npm run dev" "cd ../ && docker-compose up --build"

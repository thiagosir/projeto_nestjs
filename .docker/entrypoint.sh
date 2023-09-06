#!/bin/bash

npm install 
npm run build
npx typeorm-ts-node-commonjs migration:run -d ./ormconfig.ts
npm run start:dev
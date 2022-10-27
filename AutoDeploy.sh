#!/bin/bash

# cd to target directory
cd /root/anjone-frontend/ 2>>/dev/null || mkdir -p /root/anjone-frontend/log/ && (cd /root/anjone-frontend/ 2>>/dev/null || echo 'Failed to create target directory' && exit)

# remove previous src
rm -rf ./Anjone-WebOS/

# clone the repo
git clone https://github.com/Kwanhooo/Anjone-WebOS.git # Kwanhooo  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

# cd to src directory
cd ./Anjone-WebOS/ 2>>/dev/null || (echo 'Failed when Clone the Repository, By the way, the Password you input should be your personal github token (readable permission)' ; exit)

# delete lock file
rm -f ./package.lock.json

# install dependencies
npm install

# build production
npm run build

# generate static production (client side)
npm run generate

# check Dockerfile
if [ ! -f ./Dockerfile ]; then
  if [ -f ../Dockerfile ]; then
    cp ../Dockerfile ./
  else
    echo 'Dockerfile not found! Deploy FAILED!' && exit
  fi
fi

# check default.conf
if [ ! -f ./default.conf ]; then
  if [ -f ../default.conf ]; then
    cp ../default.conf ./
  else
    echo 'default.conf not found! Deploy FAILED!' && exit
  fi
fi

# stop previous docker container
docker stop anjone-frontend

# remove previous docker container
docker rm anjone-frontend

# remove previous docker image
docker image rm anjone-frontend

# build new docker image
docker build -t anjone-frontend .

# start new image
docker run -p 10088:80 \
-v /root/anjone-frontend/log/:/usr/share/nginx/log/ \
--name anjone-frontend \
-d anjone-frontend

# clean up the src
rm -rf ./Anjone-WebOS/

# THE END
echo 'Deploy Succeed! anjone-frontend is now running on port 10088'

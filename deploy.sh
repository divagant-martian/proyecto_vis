#!/bin/bash

cd ./front-end
yarn build
cd ..
rm -r ./docs
git rm -rf ./docs
mv ./front-end/build ./docs
cd ./docs
ln -s ../data ./
cd ..
git add ./docs



#!/bin/bash

cd ./front-end
yarn build
cd ..
git rm -rf ./docs
rm -r ./docs
mv ./front-end/build ./docs
git add ./docs



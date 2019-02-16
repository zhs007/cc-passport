rm -rf $PWD/dist
docker build -f ./Dockerfile.build -t cc-passport-build .
docker container stop cc-passport-build
docker container rm cc-passport-build
docker run --name cc-passport-build -v $PWD/dist:/usr/src/app/dist cc-passport-build
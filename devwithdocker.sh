docker build -f ./Dockerfile.dev -t cc-passport-dev .
docker container stop cc-passport-dev
docker container rm cc-passport-dev
docker run -d --name cc-passport-dev cc-passport-dev
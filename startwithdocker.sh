docker build -f ./Dockerfile.hub -t cc-passport-hub .
docker container stop cc-passport-hub
docker container rm cc-passport-hub
docker run -d --name cc-passport-hub -p 80:80 -v $PWD/nginx.conf.d:/etc/nginx/conf.d cc-passport-hub
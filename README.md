## PREREQUISITES
Docker installed

## Getting started using docker
1. In order to run the app in docker on your local computer - make sure you are in the right directory (presales-cbcheckoutapp), then run the following:
```
docker build . -t cb-checkout
```

2. Wait until it is finished, and then run:
```
docker images cb-checkout
```
This should print out something like:
```
REPOSITORY    TAG       IMAGE ID       CREATED          SIZE
cb-checkout   latest    c4bcb2382bb5   41 minutes ago   945MB
```

3. Finally run the image in a container using:
```
docker run -p 8000:8000 --name cb-checkout-latest -d cb-checkout:latest
```

The application will be available under http://localhost:8000

To stop the application run:
```
docker stop cb-checkout-latest
```


## Getting started WITHOUT docker
You need to be in the presales-cbcheckoutapp directory:
1. Run `npm install`
2. When finished run `node index.js`
3. The application will be available under http://localhost:8000

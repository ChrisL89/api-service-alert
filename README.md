# api-service-alert

Web service to accept restful api request and place it in redis simple message queue


## Dependencies
- docker
- nvm
- nodejs v10.6.0

## Before started
Before you kick off install/run this project, please execute this command to ensure your node js is in same version.

```shell
nvm install
nvm use
```

## Install
```shell
npm install
```



## To bring up local dev environment
```shell
make build && make run-docker-dev
```

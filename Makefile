#############################
# Docker Teritory
#############################
DOCKER := docker
COMPOSE := docker-compose

dkbu:
	${DOCKER} build --tag node-gr8-api:latest --compress .
	${DOCKER} tag node-gr8-api:latest 705471/node-gr8-api:latest

dkpu:
	${DOCKER} push 705471/node-gr8-api:latest

dkru:
	${DOCKER} run --name node-gr8-api -p 3000:3000 --restart always --env-file .env --privileged -d 705471/node-gr8:latest

dcu:
	${COMPOSE} up -d --remove-orphans --build

dcd:
	${COMPOSE} down

#############################
# Application Teritory
#############################
NPM := npm

dev:
	${NPM} run dev

start:
	${NPM} start

build:
	${NPM} run build
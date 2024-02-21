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


#############################
# Migration Teritory
#############################
SCLI := @npx sequelize-cli
TSC := ./node_modules/.bin/tsc
OUT_DIR := dist/databases
TARGET_DIR := src/databases/**/*.ts

mig-status:
	${SCLI} db:migrate:status

mig-build:
	${TSC} --outDir ${OUT_DIR} --target es2018  --module commonjs --esModuleInterop ${TARGET_DIR}

mig-up:
	${TSC} --outDir ${OUT_DIR} --target es2018  --module commonjs --esModuleInterop ${TARGET_DIR}
	${SCLI} db:migrate

mig-down:
	${SCLI} db:migrate:undo

mig-seed:
	${SCLI} db:seed:all

mig-seed-del:
	${SCLI} db:seed:undo:all
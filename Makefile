install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint --ext .jsx,.js .

lint-fix:
	npx eslint --fix --ext .jsx,.js .

publish:
	npm publish

deploy:
	git push heroku

test:
	npm run test

test-watch:
	npm run test-watch

.PHONY: test

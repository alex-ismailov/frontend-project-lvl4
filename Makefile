install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

test:
	npm test -s

test-watch:
	npm run test-watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint ./src/ --ext js,jsx

lint-fix:
	npx eslint ./src/ --fix --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

.PHONY: test

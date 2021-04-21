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
	npx eslint --ext .jsx,.js ./src/

lint-fix:
	npx eslint --fix --ext .jsx,.js ./src/

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test

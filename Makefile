.PHONY: deps build develop-site preview-site

deps:
	yarn install

build: deps
	yarn build

develop-site: deps
	yarn dev

preview-site: build
	yarn preview

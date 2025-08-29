.PHONY: deps build run preview-site

deps:
	yarn install

build: deps
	yarn build

run:
	yarn dev

preview-site: build
	@echo "Serving exported site from ./out at http://localhost:4321"
	yarn dlx serve -s out -l 4321



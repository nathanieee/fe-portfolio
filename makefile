SHELL := /bin/sh

APP_NAME ?= fe-portfolio
IMAGE_NAME ?= $(APP_NAME)-dev
CONTAINER_NAME ?= $(APP_NAME)-dev
PORT ?= 3000

# Release configuration
REPO_NAME ?= $(shell basename $(PWD))
VERSION ?= $(shell git describe --tags --abbrev=0 2>/dev/null || echo "v0.1.0")
DEFAULT_BRANCH ?= main

.PHONY: help dev stop clean release create-tag push-tag test-release check-clean \
	check-git validate-version check-tag-not-exists

help:
	@echo "Targets:"
	@echo "  dev           Build + run dev container on port $(PORT)"
	@echo "  stop          Stop dev container"
	@echo "  clean         Remove dev container and image"
	@echo "  test-release  Build production image locally"
	@echo "  create-tag    Create annotated git tag (VERSION=$(VERSION))"
	@echo "  push-tag      Push VERSION tag to origin"
	@echo "  release       test-release + create-tag + push-tag"

dev:
	docker build -f docker/dockerfile-dev -t $(IMAGE_NAME) .
	docker rm -f $(CONTAINER_NAME) >/dev/null 2>&1 || true
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3000 \
		-v $(PWD):/app \
		-v /app/node_modules \
		-e CHOKIDAR_USEPOLLING=true \
		$(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME) || true

clean: stop
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true

# Release targets
release: test-release create-tag push-tag
	@echo "Release $(VERSION) created and pushed successfully!"

create-tag: check-git check-clean validate-version check-tag-not-exists
	@echo "Creating tag $(VERSION)..."
	git tag -a $(VERSION) -m "Release $(VERSION)"
	@echo "Tag $(VERSION) created. Push with 'make push-tag'"

push-tag: check-git
	@echo "Pushing tag $(VERSION) to remote..."
	git push origin $(VERSION)
	@echo "Tag $(VERSION) pushed. CI/CD pipeline should start automatically."

test-release:
	@echo "Testing production build..."
	DOCKER_BUILDKIT=1 docker build -f docker/dockerfile-prod -t $(REPO_NAME):$(VERSION) .
	@echo "Build successful! Run 'docker run -p 8080:80 $(REPO_NAME):$(VERSION)' to test locally"
	@echo "If everything looks good, run 'make release VERSION=v1.2.3' to create the release"

check-git:
	@command -v git >/dev/null 2>&1 || { echo "git is required."; exit 1; }

check-clean:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Working tree is not clean. Commit or stash changes before tagging."; \
		exit 1; \
	fi

validate-version:
	@if ! printf "%s" "$(VERSION)" | grep -Eq '^v[0-9]+\.[0-9]+\.[0-9]+$$'; then \
		echo "VERSION must be in vMAJOR.MINOR.PATCH format (e.g., v1.2.3)."; \
		exit 1; \
	fi

check-tag-not-exists:
	@if git rev-parse "$(VERSION)" >/dev/null 2>&1; then \
		echo "Tag $(VERSION) already exists. Use a new version."; \
		exit 1; \
	fi

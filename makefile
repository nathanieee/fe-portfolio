IMAGE_NAME=fe-portfolio-dev
CONTAINER_NAME=fe-portfolio-dev
PORT=3000

# Release configuration
REPO_NAME=$(shell basename $(PWD))
VERSION?=$(shell git describe --tags --abbrev=0 2>/dev/null || echo "v0.1.0")

.PHONY: dev stop clean release create-tag push-tag test-release

dev:
	docker build -f docker/dockerfile-dev -t $(IMAGE_NAME) .
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3000 \
		-v $(PWD):/app \
		-v /app/node_modules \
		-e CHOKIDAR_USEPOLLING=true \
		$(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME) || true

clean:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true

# Release targets
release: test-release create-tag push-tag
	@echo "Release $(VERSION) created and pushed successfully!"

create-tag:
	@echo "Creating tag $(VERSION)..."
	git tag -a $(VERSION) -m "Release $(VERSION)"
	@echo "Tag $(VERSION) created. Push with 'make push-tag'"

push-tag:
	@echo "Pushing tag $(VERSION) to remote..."
	git push origin $(VERSION)
	@echo "Tag $(VERSION) pushed. CI/CD pipeline should start automatically."

test-release:
	@echo "Testing production build..."
	docker build -f docker/dockerfile-prod -t $(REPO_NAME):$(VERSION) .
	@echo "Build successful! Run 'docker run -p 8080:80 $(REPO_NAME):$(VERSION)' to test locally"
	@echo "If everything looks good, run 'make release VERSION=v1.2.3' to create the release"

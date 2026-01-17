IMAGE_NAME=fe-portfolio-dev
CONTAINER_NAME=fe-portfolio-dev
PORT=3000

.PHONY: dev stop clean

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

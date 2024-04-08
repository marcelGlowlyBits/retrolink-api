# Dockerfile voor de productieomgeving
DOCKERFILE_PROD := Dockerfile.prod

# Dockerfile voor de ontwikkelingsomgeving
DOCKERFILE_DEV := Dockerfile.dev

run-dev:
	docker-compose -f docker-compose.dev.yml up

stop:
	docker stop $(IMAGE_NAME)-prod $(IMAGE_NAME)-dev

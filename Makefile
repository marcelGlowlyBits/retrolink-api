# Dockerfile voor de productieomgeving
DOCKERFILE_PROD := Dockerfile.prod

# Dockerfile voor de ontwikkelingsomgeving
DOCKERFILE_DEV := Dockerfile.dev

run-dev:
	docker-compose -f docker-compose.dev.yml up

# Doel om een container te stoppen
stop:
	docker stop $(IMAGE_NAME)-prod $(IMAGE_NAME)-dev

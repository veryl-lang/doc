# Docker Image

The official Docker image is provided through Docker Hub.

[https://hub.docker.com/r/veryllang/veryl](https://hub.docker.com/r/veryllang/veryl)

The image can be used as the base image for your custormized image, GitLab CI/CD and so on.
Here is some examples to use the image.

## `docker` command

You can pull the image from `veryllang/veryl`.

```console
$ docker pull veryllang/veryl
```

## `Dockerfile`

If you want to use the image as a base of your Docker image, the following `FROM` directive can be used.

```Dockerfile
FROM veryllang/veryl:latest
```

## GitLab CI/CD

The following is an example of `.gitlab-ci.yml` for GitLab CI/CD.

```yaml
image: "veryllang/veryl"

build:
  stage: build
  script:
    - veryl build

fmt:
  stage: build
  script:
    - veryl fmt --check
```

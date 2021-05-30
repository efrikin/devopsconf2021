FROM golang:1.16-alpine AS builder

ENV K8S_VERSION="1.19.7"
ENV CGO_ENABLE=0
ENV GO111MODULE=on

RUN apk add --no-cache \
    bash \
    curl \
    gcc \
    make \
    musl-dev \
    rsync

WORKDIR /srv

RUN curl -fsSLo- https://github.com/kubernetes/kubernetes/archive/refs/tags/v${K8S_VERSION}.tar.gz | \
        tar -xz --strip-components=1
RUN ./hack/build-go.sh cmd/kubemark/

FROM alpine:latest

COPY --from=builder /srv/_output/bin/kubemark /kubemark

ENTRYPOINT ["/kubemark"]

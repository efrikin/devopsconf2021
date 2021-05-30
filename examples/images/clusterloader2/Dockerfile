FROM golang:1.16-alpine AS builder

ENV PERF_TEST_BRANCH="release-1.19"
ENV CGO_ENABLE=0
ENV GO111MODULE=on

ENV ENABLE_EXEC_SERVICE=false

RUN apk add --no-cache curl
WORKDIR /srv

RUN curl -fsSLo- https://github.com/kubernetes/perf-tests/archive/refs/heads/${PERF_TEST_BRANCH}.zip | \
    unzip -q -

WORKDIR perf-tests-${PERF_TEST_BRANCH}/clusterloader2/cmd

RUN go mod download
RUN go build -o /clusterloader2

FROM alpine:latest

COPY --from=builder /clusterloader2 /clusterloader2

ENTRYPOINT ["/clusterloader2"]

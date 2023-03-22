FROM golang:1.17.1-alpine as builder

RUN apk add --update --no-cache git

RUN mkdir /app
WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o go-api .
RUN cd migration && go build -o migrate .

FROM alpine:3.10

RUN apk add --update --no-cache ca-certificates
WORKDIR /app

# docker build -t イメージ名 . --build-arg env="環境名(develop)"
ARG env
ENV GO_ENV=${env}

COPY --from=builder /app/go-api /app/go-api
COPY --from=builder /app/${env}.env /app/${env}.env

# # migrationファイルのコピー
COPY --from=builder /app/migration/ /app/migration/
COPY ${env}.env /app/migration

# fargateで実行
# RUN ./migration/migrate up
ENTRYPOINT ["/app/go-api"]

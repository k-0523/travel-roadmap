FROM golang:1.18-rc-alpine
COPY ./backend /backend/src/app
WORKDIR /backend/src/app

RUN apk --no-cache add git 
RUN	apk add --no-cache gcc musl-dev
RUN go mod tidy && \
    go install github.com/cosmtrek/air@v1.27.3

CMD ["air", "-c", ".air.toml"]
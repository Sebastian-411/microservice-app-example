FROM golang:latest

WORKDIR /app

COPY *.go ./

ENV JWT_SECRET=JUANSE
ENV USERS_API_ADDRESS=http://127.0.0.1:8083
ENV AUTH_API_PORT=8000
ENV ZIPKIN_URL=http://zipkin:9411

RUN export GO111MODULE=on
RUN go mod init github.com/bortizf/microservice-app-example/tree/master/auth-api
RUN go mod tidy
RUN go build

EXPOSE 8000

ENTRYPOINT AUTH_API_PORT=8000 ./auth-api
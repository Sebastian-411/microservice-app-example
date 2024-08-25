FROM python:3.6
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV PORT=8081
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_CHANNEL=log_channel
ENV ZIPKIN_URL=http://127.0.0.1:9411

CMD [ "python3", "-u", "main.py"] 



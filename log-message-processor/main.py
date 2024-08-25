import time
import redis
import os
import json
import requests
from py_zipkin.zipkin import zipkin_span, ZipkinAttrs, generate_random_64bit_string
import time
import random
from prometheus_client import start_http_server, Counter, Histogram


MESSAGE_PROCESSED = Counter('log_messages_processed_total', 'Total number of log messages processed')
MESSAGE_FAILED = Counter('log_messages_failed_total', 'Total number of log messages failed')
MESSAGE_PROCESSING_TIME = Histogram('log_message_processing_duration_seconds', 'Duration of message processing in seconds')

def log_message(message):
    time_delay = random.randrange(0, 2000)
    time.sleep(time_delay / 1000)
    print('message received after waiting for {}ms: {}'.format(time_delay, message))

if __name__ == '__main__':
    start_http_server(int(os.environ['PORT']))
    redis_host = os.environ['REDIS_HOST']
    redis_port = int(os.environ['REDIS_PORT'])
    redis_channel = os.environ['REDIS_CHANNEL']
    zipkin_url = f"{os.environ.get('ZIPKIN_URL', '')}/api/v2/spans"
    def http_transport(encoded_span):
        requests.post(
            zipkin_url,
            data=encoded_span,
            headers={'Content-Type': 'application/x-thrift'},
        )

    pubsub = redis.Redis(host=redis_host, port=redis_port, db=0).pubsub()
    pubsub.subscribe([redis_channel])

    for item in pubsub.listen():
        try:
            message = json.loads(str(item['data'].decode("utf-8")))
        except Exception as e:
            log_message(e)
            MESSAGE_FAILED.inc()
            continue

        if not zipkin_url or 'zipkinSpan' not in message:
            log_message(message)
            MESSAGE_PROCESSED.inc()
            continue

        span_data = message['zipkinSpan']
        try:
            with MESSAGE_PROCESSING_TIME.time():
                with zipkin_span(
                    service_name='log-message-processor',
                    zipkin_attrs=ZipkinAttrs(
                        trace_id=span_data['_traceId']['value'],
                        span_id=generate_random_64bit_string(),
                        parent_span_id=span_data['_spanId'],
                        is_sampled=span_data['_sampled']['value'],
                        flags=None
                    ),
                    span_name='save_log',
                    transport_handler=http_transport,
                    sample_rate=100
                ):
                    log_message(message)
                    MESSAGE_PROCESSED.inc()
        except Exception as e:
            print('did not send data to Zipkin: {}'.format(e))
            log_message(message)
            MESSAGE_FAILED.inc()





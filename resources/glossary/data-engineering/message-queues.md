# Message queues

- **Message queue** — a broker that holds messages from producers until consumers process them. It decouples the two sides so a slow consumer doesn't block a producer.
  **Seen in:** the RabbitMQ management UI, which lists queues with their ready and unacknowledged message counts.

- **Polling vs push delivery** — with polling a consumer asks the queue for a message in a loop and wastes work when it is empty. With push delivery (`basic.consume` in AMQP) the broker sends messages as they arrive, so latency drops and nothing sits idle.
  **Seen in:** the RabbitMQ tutorials, which recommend consuming over repeated `basic.get`.

- **Acknowledgement (ack)** — the consumer's confirmation that a message was processed. Unacknowledged messages are redelivered if the consumer dies. With auto-ack the broker treats delivery as success, which removes any protection.
  **Seen in:** the "Unacked" column in the RabbitMQ management UI.

- **Prefetch** — the maximum number of unacknowledged messages a broker sends a consumer at once. Too low starves the consumer, too high floods its memory. Tune it to the cost of one message.
  **Seen in:** the "prefetch count" setting in a RabbitMQ client library.

- **Backpressure** — a mechanism that slows a sender when the receiver is overloaded. Acknowledgements plus a prefetch limit give a queue consumer backpressure.
  **Seen in:** TCP flow control, and streams in Node.js.

- **Message TTL (expiry)** — a lifetime after which the broker drops a message that has not been consumed. It stops stale work from piling up, and can be set per message or per queue.
  **Seen in:** the RabbitMQ documentation on time-to-live and expiration.

- **Backlog** — messages waiting in a queue. A backlog that keeps growing means messages arrive faster than they are processed. Age of the oldest message shows the damage better than the count alone.
  **Seen in:** the "Ready" graph in the RabbitMQ management UI.

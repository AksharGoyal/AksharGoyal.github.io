# Reliable processing

- **At-most-once, at-least-once, exactly-once** — delivery guarantees. At-most-once may lose a message. At-least-once never loses one but may deliver it twice. True exactly-once is very hard across a network, so systems usually pair at-least-once delivery with idempotent handling to get an exactly-once effect.
  **Seen in:** the delivery and acknowledgement documentation of RabbitMQ and Kafka.

- **Idempotent consumer** — a message handler that is safe to run twice on the same message, for example by recording processed message ids or by writing with an upsert instead of an insert.
  **Seen in:** a `INSERT ... ON CONFLICT DO UPDATE` statement in Postgres.

- **Retry with exponential backoff and jitter** — wait longer after each failure (1 s, 2 s, 4 s...) and add a random amount, so many clients that failed together don't all retry at the same instant (a thundering herd).
  **Seen in:** the retry settings in most cloud SDKs.

- **Dead-letter queue (DLQ)** — a side queue for messages that keep failing. It stops one bad message from blocking the rest, and keeps the message for a human to inspect.
  **Seen in:** the `x-dead-letter-exchange` argument in RabbitMQ.

- **Circuit breaker** — after repeated failures calling a dependency, stop calling it for a while and fail fast, then try again carefully. It protects both your service and the struggling one.
  **Seen in:** libraries such as resilience4j and pybreaker.

- **Transactional outbox** — write the business change and the "event to send" in the same database transaction, and let a separate process publish the events. It avoids the case where the database commit succeeds but the message is never sent.
  **Seen in:** an `outbox` table next to an `orders` table.

- **Backfill** — re-running a pipeline over past data, after a bug fix or schema change. It is only safe when each run is idempotent, so reruns replace data instead of duplicating it.
  **Seen in:** the date-range arguments of Airflow's `backfill` command.

- **Write-ahead log (WAL)** — write each change to an append-only log before applying it, so a crash can replay the log and recover. Databases and queues rely on it.
  **Seen in:** the `pg_wal` directory of a Postgres server.

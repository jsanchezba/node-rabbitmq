# node-rabbitmq
Node.js task queuing through RabbitMQ


## Run RabbitMQ server
`docker-compose -f ./docker/docker-compose.yml up -d`

## Install dependencies
```bash
pnpm install
# or
npm install
```

## Run consumer server
```bash
cd ./consumer && pnpm run dev
# or
cd ./consumer && npm run dev
```

## Run publisher server
```bash
cd ./publisher && pnpm run dev
# or
cd ./publisher && npm run dev
```
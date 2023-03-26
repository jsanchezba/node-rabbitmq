import amqplib from 'amqplib'
import logger from '#config/logger'
import '#config/env'

async function main() {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_STRING)
        const channel = await connection.createChannel()
        const queue = await channel.assertQueue('invoicing')

        logger.info(`Listening consumers: ${queue.consumerCount}`)

        const data = JSON.stringify([
            {
                id: 1,
                customer: 'Bruce Wayne'
            },
            {
                id: 2,
                customer: 'Jessica Jones'
            }
        ])

        channel.sendToQueue('invoicing', Buffer.from(data))
        logger.info('Sent to queue')

    } catch (error) {
        logger.error(error)
    }
}

main()
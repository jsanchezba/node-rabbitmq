import amqplib from 'amqplib'
import logger from '#config/logger'
import '#config/env'

async function main() {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_STRING)
        const channel = await connection.createChannel()
        const queue = await channel.assertQueue('invoicing')

        const maxChannelMessages = 1
        channel.prefetch(maxChannelMessages)

        logger.info(`Queued messages: ${queue.messageCount}`)
        channel.consume('invoicing', async (message) => {
            if (message !== null) {
                const inputData = message.content.toString()
                const data = JSON.parse(inputData)

                logger.info('Message received')

                for (const invoice of data) {
                    logger.info(`Invoice ${invoice.id} from customer ${invoice.customer}`)
                }
                await new Promise(resolve => setTimeout(resolve, 15000))
                channel.ack(message)

                logger.info('Task completed')
            }
        })

        logger.info('Waiting for messages...')
    } catch (error) {
        logger.error(error.message)
    }
}

main()
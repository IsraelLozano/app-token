import { createClient } from 'redis';
require('dotenv').config();

export const dbConnection = async () => {
    try {

        const client = createClient({
            password: `${process.env.PASSWORD_REDIS}`,
            socket: {
                host: `${process.env.HOST_REDIS}`,
                port: Number(process.env.PORT_REDIS)
            }
        });
        await client.connect();
        console.log('Db connected successfully');
        return client;

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectar a Redis.')
    }
}

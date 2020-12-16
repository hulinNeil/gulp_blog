import config from '../config';
import Redis from 'ioredis';

const { host } = config.redis;

const redis = new Redis({
  port: 6379, // Redis port
  host, // Redis host
});

export default redis;

import { WebClient, LogLevel } from '@slack/web-api';
import { token } from '../config.js';

const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG
});


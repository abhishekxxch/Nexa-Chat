import express from 'express';
import { Message } from '../controllers/chatbox.message.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'chatbot-api',
    timestamp: new Date().toISOString(),
  });
});

router.post('/message', Message);

export default router;
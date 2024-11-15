import { sendMessage } from '../lib/apiOpenAi.js';

describe('sendMessage', () => {
  test('should return a response from OpenAI', async () => {
    const message = 'Hola';
    const inventor = 'Alexander Graham Bell';
    const response = await sendMessage(message, inventor);
    expect(response).toBeDefined();
  });
});

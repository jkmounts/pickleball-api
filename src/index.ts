import { config } from 'dotenv';
import app from './app.js';

config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
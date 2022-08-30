import { config } from 'dotenv';
import express from 'express';
import passport from 'passport';
import { initDriver } from './neo4j';
import routes from './routes/index';

config();
const {
  NEO4J_URI,
  NEO4J_USERNAME,
  NEO4J_PASSWORD,
  API_PREFIX,
} = process.env;


const app = express();

// Authnetication
app.use(passport.initialize());

app.use(express.json());

// init neo4j Driver
initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

// API ROUTES
app.use(API_PREFIX || '/api', routes);

export default app;
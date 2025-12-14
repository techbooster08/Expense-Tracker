import 'dotenv/config';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/db.config.js';
import v1Routes from './routes/v1Routes.routes.js';


const app = express();
const port = process.env.PORT;

// middlewares

// for send & using cookie
app.use(cookieParser());


// for managing Cors policy
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:2008',
     process.env.Allowed_Origin
]; 

const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, etc)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable CORS with credentials
};
app.use(cors(corsOptions));

//middleware for incoming data management 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

// db connection 
db.connect();

app.use("/api/v1", v1Routes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});

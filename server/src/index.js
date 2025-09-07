import express from 'express'
import dotenv from "dotenv"
import connectDB from './db/index.js'
import { connect } from 'mongoose'
import userRoutes from './routes/user.routes.js'
import examRoutes from './routes/exam.routes.js'
import cookieParser from 'cookie-parser'
import cron from 'node-cron';
import cors from 'cors'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


const port = 3000
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


dotenv.config(
    {path: './.env'}
)

connectDB()
.catch((err) => {
  console.log("error in connecting db ", err);
})

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/exam", examRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import createHttpError from 'http-errors';
import { errorHandler } from "./middlewares/errors";
import "express-async-errors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { specs } from "./utils/swagger";
import { AppConfig } from "./config/AppConfig";

const app: Application = express();
dotenv.config();

app.use(cors());


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT: number = AppConfig.PORT || 8000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})

app.use('/api', routes);
app.use((req, res, next) => {
  next(createHttpError.NotFound());
})
app.use(errorHandler);
app.use(morgan('dev'));

app.use(express.static("public"));



app.listen(PORT, async () => {
  console.log(`🗄️  Server Fire on http://localhost:${PORT}`);

  try {

    await mongoose.connect(
      AppConfig.DATABASE.URL
    );
    console.log("Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
    console.log(JSON.stringify(error));
  }
});
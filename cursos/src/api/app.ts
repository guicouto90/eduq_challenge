import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { errorHandler } from "../middlewares/errorHandler";
import routes from '../routes/courseRoutes';

class App {
  public express: express.Application

  public constructor () {
    this.express = express();

    this.middlewares();
    this.routes();
    this.errorHandler();
    this.database();
  }

  private middlewares (): void {
    this.express.use(express.json());
    this.express.use(cors())
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/Curso')
  }

  private routes(): void {
    this.express.use(routes)
  }

  private errorHandler(): void {
    this.express.use(errorHandler);
  }

}

export default new App().express;
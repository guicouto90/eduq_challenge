import { Router } from 'express'
import UserController from '../controller/UserController';

const routes = Router()

routes.get('/users', UserController.list);

export default routes

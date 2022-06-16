import { Router } from 'express'
import UserController from '../controller/UserController';

const routes = Router()

routes.get('/users/:id', UserController.listById)
routes.get('/users/email/:email', UserController.listByEmail)
routes.get('/users', UserController.list);
routes.post('/users', UserController.add);
routes.put('/users/purchase/:id', UserController.updateNewProduct)
routes.put('/users/cancel/:id', UserController.updateCancelProduct)

export default routes

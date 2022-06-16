import { Router } from 'express'
import SalesController from '../controller/SalesController';

const routes = Router()

routes.get('/sales', SalesController.list)
routes.post('/sales', SalesController.add)
routes.put('/sales/:id', SalesController.updateSale)

export default routes

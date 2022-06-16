import { Router } from 'express'
import CourseController from '../controller/CourseController';

const routes = Router()

routes.get('/course/:course/:id', CourseController.access)

export default routes

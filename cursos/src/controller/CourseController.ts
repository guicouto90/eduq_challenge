import { NextFunction, Request, Response } from 'express'
import CourseService from '../service/CourseService';

class CourseController {
  public async access(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const access = await CourseService.accessCourse(req.params.course, req.params.id);

      return res.status(200).json(access);
    } catch (error) {
      next(error)
    }
  }
}

export default new CourseController();
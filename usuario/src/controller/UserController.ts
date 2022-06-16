import { NextFunction, Request, Response } from 'express'
import UserService from '../service/UserService';

class UserController {
  public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.listUsers();

      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();
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

  public async listById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.listUserById(req.params.id);

      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  }

  public async listByEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.listUserByEmail(req.params.email);

      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  }

  public async add(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.addUser(req.body);

      return res.status(201).json(users);
    } catch (error) {
      next(error)
    }
  }

  public async updateNewProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.updateUserPurchase(req.params.id, req.body);

      return res.status(202).json(users);
    } catch (error) {
      next(error)
    }
  }

  public async updateCancelProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await UserService.updateUserCancel(req.params.id, req.body);

      return res.status(202).json(users);
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();
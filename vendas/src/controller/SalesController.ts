import { NextFunction, Request, Response } from 'express'
import SalesService from '../service/SalesService';

class SalesController {
  public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const sales = await SalesService.listSales();

      return res.status(200).json(sales);
    } catch (error) {
      next(error)
    }
  }

  public async add(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const sales = await SalesService.addPurchase(req.body);

      return res.status(201).json(sales);
    } catch (error) {
      next(error)
    }
  }

  public async updateSale(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const sales = await SalesService.cancelPurchase(req.params.id);

      return res.status(202).json(sales);
    } catch (error) {
      next(error)
    }
  }
}

export default new SalesController();
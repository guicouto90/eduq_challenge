import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): any => {
  console.error(err.message);
  if(err.status) return res.status(err.status).json({ message: err.message });
  if(err.details) return res.status(400).json({ message: err.details[0].message });
  if(err) return res.status(400).json({ message: err.message })

  return res.status(500).json({message: 'Internal Error'});
};
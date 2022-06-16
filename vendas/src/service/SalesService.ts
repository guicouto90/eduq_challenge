import { Sales } from '../model/Sales';
import { cancelSale, getUserByEmail, newSale } from '../utils/axios';
import { errorConstructor } from '../utils/errorConstructor';
import { salesSchemaPost } from '../utils/joiSchema';

class SalesService {
  private validateNewSales(serviceKey: String, buyerEmail: String, productId: String): any {
    const { error } = salesSchemaPost.validate({ serviceKey, buyerEmail, productId })
    if(error) throw error;
  }

  private async findSaleById(id: String): Promise<any> {
    const sale = await Sales.findById(id);
    if(!sale) throw errorConstructor(404, 'Sale not found')
    return sale;
  }

  private async findUser(email: String): Promise<any> {
    const user = await getUserByEmail(email);
    if(!user) throw errorConstructor(404, 'User not found');
    return user;
  }

  private async newSale(id: String, productId: String): Promise<void> {
    await newSale(id, productId);
  }

  private async cancelSale(id: String, productId: String): Promise<void> {
    await cancelSale(id, productId);
  }

  public async listSales(): Promise<any> {
    const sales = await Sales.find();

    return sales;
  }

  public async addPurchase(body: any): Promise<any> {
    const { serviceKey, buyerEmail, productId } = body;

    this.validateNewSales(serviceKey, buyerEmail, productId );
    const user = await this.findUser(buyerEmail);
    await this.newSale(user._id, productId);
    const newSale = await Sales.create({ serviceKey, buyerEmail, productId, status: 'purchased' });

    return newSale;
  }

  public async cancelPurchase(id: String): Promise<Object> {
    const { buyerEmail, productId, status } = await this.findSaleById(id);
    if(status == 'canceled') throw errorConstructor(400, 'Sale already canceled')
    const user = await this.findUser(buyerEmail);
    await this.cancelSale(user._id, productId);
    await Sales.findByIdAndUpdate(id, { status: 'canceled' })

    return { message: `Sale with id ${id} canceled`};
  }
}

export default new SalesService();
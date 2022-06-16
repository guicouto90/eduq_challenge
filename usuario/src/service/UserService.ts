import { User } from '../model/User';
import { errorConstructor } from '../utils/errorConstructor';
import { userSchemaPost, userSchemaPut } from '../utils/joiSchema';

class UserService {

  private validateNewUser(email: String, role: String, products: Array<String>): any {
    const { error } = userSchemaPost.validate({ email, role, products });
    if(error) throw error;
  };

  private validateUpdateUser(productId: String): any {
    const { error } = userSchemaPut.validate({ productId });
    if(error) throw error;
  };
  
  private async verifyUser(email: String): Promise<any> {
    const user = await User.findOne({ email });
    if(user) {
      throw errorConstructor(409, 'Email already registered')
    }
  }

  public async listUsers(): Promise<any> {
    const users = await User.find();
    return users;
  }

  public async addUser(body: any): Promise<any> {
    const { email, role, products } = body;
    this.validateNewUser(email, role, products);
    await this.verifyUser(email);
    const newUser = await User.create({email, role, products});

    return newUser;
  }

  public async listUserById(id: String): Promise<any> {
    const user = await User.findById(id);
    if(!user) {
      throw errorConstructor(404, 'User not found')
    }
    return user;
  }

  public async listUserByEmail(email: String): Promise<any> {
    const user = await User.findOne({ email });
    if(!user) {
      throw errorConstructor(404, 'User not found')
    }
    return user;
  }

  public async updateUserPurchase(id: String, body: any): Promise<Object> {
    const { productId } = body;
    this.validateUpdateUser(productId);
    const { products } = await this.listUserById(id);
    products.forEach(({product}: any) => {
      if(product === productId) throw errorConstructor(409, 'User already has this product');
    });
    products.push({product: productId});
    await User.findByIdAndUpdate(id, {role: 'PREMIUM_USER', products});

    return {message: `User with id ${id} updated`};
  }

  public async updateUserCancel(id: String, body: any): Promise<Object> {
    const { productId } = body;
    this.validateUpdateUser(productId);
    const { products } = await this.listUserById(id);
    const verify = products.some(({ product }: any) => product == productId);
    if(verify === false) throw errorConstructor(400, 'User doesnt have this product');
    products.forEach(({product}: any, index: Number) => {
      if(product === productId) {
        products.splice(index, 1);
      }
    });
    if(products.length > 0) {
      await User.findByIdAndUpdate(id, {role: 'PREMIUM_USER', products});
    } else {
      await User.findByIdAndUpdate(id, {role: 'DEFAULT_USER', products});
    }

    return {message: `User with id ${id} updated`};
  }

}

export default new UserService();
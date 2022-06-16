import { User } from '../model/User';


class UserService {
  public async listUsers(): Promise<any> {
    const users = await User.find();
    return users;
  }
}

export default new UserService();
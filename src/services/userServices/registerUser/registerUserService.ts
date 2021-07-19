import UserDAO from "../../../dao/userDAO";

export default class RegisterUserService {
  constructor(protected userDAO: UserDAO) {}

  async registerUser(data: any, tenantId: string): Promise<any> {



  }
}

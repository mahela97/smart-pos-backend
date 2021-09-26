import UserDAO from "../../../dao/userDAO";
import UserModel from "../../../models/userModel";
import EmailService from "../../emailService/emailService";
import { UserDocument } from "../../../schemaModels/user.model";

export default class RegisterUserService {
  constructor(protected userDAO: UserDAO) {}

  async registerUser(
    data: UserModel,
    emailService: EmailService
  ): Promise<UserDocument> {
    await emailService.sendMail(
      [data.email],
      "New Manager Account Login Credentials",
      `Login email - ${data.email}. Login Password - ${data.password}`
    );
    // eslint-disable-next-line no-param-reassign
    delete data.password;
    // eslint-disable-next-line no-param-reassign
    delete data.rePassword;
    const result = await this.userDAO.add(data);
    return result;
  }
}

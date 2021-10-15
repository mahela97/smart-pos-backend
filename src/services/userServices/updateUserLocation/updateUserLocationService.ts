import UserModel from "../../../models/userModel";
import UserDAO from "../../../dao/userDAO";

export default class UpdateUserLocationService {
    constructor(protected userDAO: UserDAO) {}

    async updateUserLocation(
        userId: string,
        userState: Partial<UserModel>
    ): Promise<void> {
        await this.userDAO.updateLocation(userId, userState);
    }
}

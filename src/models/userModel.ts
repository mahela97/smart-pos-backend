interface UserModel {
  uid?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  warehouseId?: string;
  email?: string;
  telephone: string;
  archived: boolean;
}

export default UserModel;

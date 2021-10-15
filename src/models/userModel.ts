interface UserModel {
  uid: string;
  firstName: string;
  lastName: string;
  role: string;
  longitude?: string;
  latitude?: string;
  warehouseId?: string;
  email: string;
  telephone: string;
  archived: boolean;
  password?: string;
  rePassword?: string;
}

export default UserModel;

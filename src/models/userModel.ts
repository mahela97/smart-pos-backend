interface UserModel {
  uid: string;
  tenantId: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  address?: string;
  district?: string;
  city?: string;
  postalCode?: string;
  email?: string;
  tp?: string;
  roles?: string[];
  archived: boolean;
}

export default UserModel;

interface LeaveModel {
  userId: string;
  description: string;
  approved: boolean;
  from: string;
  to: string;
  createdAt?: string;
  updatedAt?: string;
  archived: boolean;
}

export default LeaveModel;

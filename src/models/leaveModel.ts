interface LeaveModel {
  userId: string;
  description: string;
  approved: string;
  from: string;
  to: string;
  createdAt?: string;
  updatedAt?: string;
  archived: boolean;
}

export default LeaveModel;

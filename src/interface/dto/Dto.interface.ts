export interface IUser {
  code: number;
  message: string;
  success: boolean;
  data: object;
}
export interface ISingleDashboard {
  date: string;
  user: number;
  review: number;
}
export interface IMultipleDashboard {
  code: number;
  message: string;
  success: boolean;
  data: ISingleDashboard[];
}

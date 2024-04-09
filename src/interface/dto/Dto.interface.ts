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

export interface ISingleEvent {
  id: number;
  title: string;
  content: string;
  mainThumbnailUrl: string;
  brandName: string;
  hashtags: string[];
  startDate: string;
  endDate: string;
}
export interface IMultipleEvent {
  code: number;
  message: string;
  success: boolean;
  data: {
    results: ISingleEvent[];
    page: number;
    totalPage: number;
    queryCount: number;
    resultsLength: number;
  };
}

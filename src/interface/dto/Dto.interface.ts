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

export interface IMutipleEventResult {
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
    results: IMutipleEventResult[];
    page: number;
    totalPage: number;
    queryCount: number;
    resultsLength: number;
  };
}

export interface ISingleEvent {
  code: number;
  message: string;
  success: boolean;
  data: {
    id: number;
    title: string;
    content: string;
    mainThumbnailUrl: string;
    brandName: string;
    hashtags: [string];
    startDate: Date;
    endDate: Date;
    viewCount: number;
    likesCount: number;
    isPublic: boolean;
    images: string[];
  };
}

export interface IPhoto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IPagination {
  page: number;
  pageCount: number;
  pageLimit: number;
}

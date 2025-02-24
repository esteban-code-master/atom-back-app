export interface Pagination<T> {
  data: T[];
  lastVisibleId: string | null;
  totalPage: number;
}

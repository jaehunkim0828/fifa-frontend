export interface PaginationProps {
  totalCount: number;
  count: number;
  getCurrentPage: (cur_page: number) => Promise<void>;
}

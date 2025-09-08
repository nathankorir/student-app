export interface PaginatedResponse<T> {
  content: T[];
  pageable?: any;
  totalElements?: number;
  totalPages?: number;
  first?: boolean;
  last?: boolean;
  size?: number;
  number?: number;
}

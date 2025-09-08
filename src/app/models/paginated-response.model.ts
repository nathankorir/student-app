export interface PaginatedResponse<T> {
  content: T[];
  pageable?: any;
  totalElements?: number;
  totalPages?: number; // optional
  first?: boolean;
  last?: boolean;
  size?: number;
  number?: number;
}

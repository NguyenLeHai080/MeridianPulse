export interface BaseApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface NavItem {
  name: string;
  path: string;
  iconName: string;
  roles?: string[];
}

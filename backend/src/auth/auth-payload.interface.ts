import { User } from 'src/user/user.schema';

export interface AuthPayload {
  access_token: string;
  refresh_token: string;
  user?: Partial<User>;
}

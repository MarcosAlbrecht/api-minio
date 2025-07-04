import { UserModel } from "../models/user.model";

export class ReturnAuthDto {
  token: string;
  user: UserModel;

  constructor(token: string, user: UserModel) {
    this.token = token;
    this.user = user;
  }
}

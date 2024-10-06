import { defaultAxios } from "@shared/api/defaultAxios";
import { IUser } from "./IUser";
import { Observer } from "@shared/lib/Observer";

class UsersApiService extends Observer {
  private _users = new Map<number, IUser>();

  get users() {
    return Array.from(this._users.values());
  }

  async getUsers() {
    if (this._users.size) return this._users;

    const users = await defaultAxios.get<IUser[]>("users");

    if (!users) return;

    this._setItems(users.data);
  }

  private _setItems(users: IUser[]) {
    users.forEach((user) => this._users.set(user.id, user));
    this.emit("setItems", users);
  }
}

const instance = new UsersApiService();

export { instance as UsersApiService };

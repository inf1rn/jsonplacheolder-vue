interface IUserTableBaseRow {
  id: number;
  parent: string | null;
  rowId: string;
  name: string;
  type: "user" | "post";
}

export interface IUserTableRow extends IUserTableBaseRow {
  type: "user";
  username: string;
  website: string;
  companyName: string;
}

export interface IUserPostTableRow extends IUserTableBaseRow {
  type: "post";
}

export type TUserTableRow = IUserTableRow | IUserPostTableRow;

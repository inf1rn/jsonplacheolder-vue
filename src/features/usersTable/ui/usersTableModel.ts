import { ITableCellModel } from "@/shared/ui/CustomTable/ITableCellModel";
import { TUserTableRow } from "@features/usersTable/model/IUserTableRow";

export const usersTableModel = (): ITableCellModel<TUserTableRow>[] => {
  return [
    {
      width: 40,
      colId: "id",
      field: "id",
      headerName: "id",
    },
    {
      width: 200,
      colId: "name",
      field: "name",
      headerName: "Название",
      rowGroup: true,
    },
    {
      width: 200,
      colId: "username",
      field: "username",
      headerName: "username",
    },

    {
      width: 200,
      colId: "companyName",
      field: "companyName",
      headerName: "Компания",
    },
    {
      width: 200,
      colId: "website",
      field: "website",
      headerName: "Вебсайт",
    },
    {
      width: 120,
      colId: "words",
      headerName: "Кол-во слов",
      valueGetter: (data) => {
        if (data.type !== "post") return;

        return data.name.replace("[^ws]", "").split(" ").length;
      },
    },
    {
      width: 120,
      colId: "chars",
      headerName: "Кол-во символов",
      valueGetter: (data) => {
        if (data.type !== "post") return;

        return data.name.length;
      },
    },
  ];
};

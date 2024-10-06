export interface ITableCellModel<T extends object = object> {
  width: number;
  field?: string;
  colId: string;
  valueGetter?: (data: T) => string | number;
  cellClass?: string | string[];
  headerName: string;
  rowGroup?: boolean;
}

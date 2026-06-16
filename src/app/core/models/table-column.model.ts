export interface IColumns {
  label: string;
  key: string;
  pipe?: 'date' | 'currency';
  isAction?: boolean;
}

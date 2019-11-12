import { Value } from 'slate';

export interface INotesList {
  [key: string]: INote;
}

export interface INote {
  active: boolean;
  lastModified: number;
  data: {
    title: string;
    preview: string;
    value: Value;
  };
}

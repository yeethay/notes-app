import { INotesList } from '../interfaces';

interface IState {
  notesList: INotesList;
}

export const getNotesList = (state: IState) => state.notesList;

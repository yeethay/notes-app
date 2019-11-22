import { INotesList } from '../interfaces';

interface IState {
  notesList: INotesList;
  user: firebase.User;
}

export const getNotesList = (state: IState) => state.notesList;
export const getUser = (state: IState) => state.user;

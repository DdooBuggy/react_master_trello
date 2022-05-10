import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

let local = localStorage.getItem("toDos");
let localData = JSON.parse(local as any);

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: localData || {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

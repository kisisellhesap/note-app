import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteData } from "../../types";
import { v4 } from "uuid";

export interface Note {
  id: string;
  title: string;
  markdown: string;
  tags: string[];
}

interface NotesState {
  notes: Note[];
}
const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteData>) => {
      const newNote: Note = { ...action.payload, id: v4() };
      state.notes.push(newNote);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const i = state.notes.findIndex((x) => x.id === action.payload.id);
      state.notes.splice(i, 1, action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const i = state.notes.findIndex((x) => x.id === action.payload);
      state.notes.splice(i, 1);
    },
  },
});

export default notesSlice.reducer;
export const { addNote, updateNote, deleteNote } = notesSlice.actions;

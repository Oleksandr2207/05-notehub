import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";


const api = axios.create({
  baseURL: import.meta.env.VITE_NOTEHUB_API,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}


export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string
): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return res.data;
};


export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};

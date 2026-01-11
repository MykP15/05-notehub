import type { Note } from "../types/note";
import axios from "axios";
import type { AxiosResponse } from "axios";

export { fetchNotes, createNote, deleteNote };

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const MY_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  page: number;
  perPage?: number;
  search?: string;
}

interface NewNote {
  title: string;
  content: string;
  tag: string;
}

const fetchNotes = async ({
  page,
  perPage = 12,
  search,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      page: page,
      perPage: perPage,
      search: search,
    },
    headers: {
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return res.data;
};

const createNote = async (newNote: NewNote): Promise<Note> => {
  const res: AxiosResponse<Note> = await axios.post(BASE_URL, newNote, {
    headers: {
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return res.data;
};

const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return res.data;
};

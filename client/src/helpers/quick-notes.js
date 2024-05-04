import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNotes = async ({ limit = 10, offset = 0, token }) => {
   const URL = `${BASE_URL}/quick-notes?limit=${limit}&offset=${offset}`;

   try {
      const { data } = await axios.get(URL, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const getNote = async ({ id, token }) => {
   const URL = `${BASE_URL}/quick-notes/${id}`;

   try {
      const { data } = await axios.get(URL, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const addNewNoteDB = async ({ title, description, content, token }) => {
   const URL = `${BASE_URL}/quick-notes/new`;

   const newNote = { title, description, content };

   try {
      const { data } = await axios.post(URL, newNote, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const updateNoteDB = async ({ id, title, description, content, token }) => {
   const URL = `${BASE_URL}/quick-notes/update/${id}`;

   const note = { title, description, content };

   try {
      const { data } = await axios.put(URL, note, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const deleteNoteDB = async ({ id, token }) => {
   const URL = `${BASE_URL}/quick-notes/delete/${id}`;

   try {
      const { data } = await axios.delete(URL, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

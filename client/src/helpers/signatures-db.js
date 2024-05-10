import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllSignatures = async (token) => {
   const URL = `${BASE_URL}/signatures`;

   try {
      const { data } = await axios.get(URL, {
         headers: {
            "x-token": token,
         },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const getSignature = async ({ token, id }) => {
   const URL = `${BASE_URL}/signatures/${id}`;

   try {
      const { data } = await axios.get(URL, {
         headers: {
            "x-token": token,
         },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

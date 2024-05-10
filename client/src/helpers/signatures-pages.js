import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllSignaturesPages = async ({ token, id, offset = 0, limit = 5 }) => {
   const URL = `${BASE_URL}/signatures/pages/${id}/all?limit=${limit}&offset=${offset}`;

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

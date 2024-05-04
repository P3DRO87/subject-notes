export const isValidEmail = (email) => {
   const match = String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

   return !!match;
};

export const isEmail = (email, errMsg) => {
   return isValidEmail(email) || errMsg;
};

export const isValidImg = (type) => /\image\/(jpg|jpeg|png|gif)$/.test(type);

import React from "react";
import { Typewriter as RSTypeWriter } from "react-simple-typewriter";

const TypeWriter = ({ texts = [] }) => {
   return (
      <RSTypeWriter
         words={texts}
         loop={false}
         cursor
         typeSpeed={100}
         deleteSpeed={90}
         delaySpeed={3500}
      />
   );
};

export default TypeWriter;

import { useSelector } from "react-redux";

const AppWrapper = ({ children }) => {
   const { test } = useSelector((state) => state.test);

   return <>{children}</>;
};

export default AppWrapper;

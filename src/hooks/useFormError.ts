import { useState } from "react";

const useFormError = () => {
  const [errorMessage, setErrorMessage] = useState("");
  return { errorMessage, setErrorMessage };
};

export default useFormError;

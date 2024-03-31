import { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(""); 

  return (
    <EmailContext.Provider value={{ email, setEmail, userType, setUserType }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);

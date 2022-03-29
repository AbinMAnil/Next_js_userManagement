import React from "react";
import "../styles/globals.css";
export const AppContext = React.createContext();
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState("");

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;

import React, { createContext, useState } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [results, setResults] = useState(() => [
    {
      id: "700",
      title: "700",
      coordinate: { latitude: 33.018079, longitude: -96.496097 },
      uri: "https://picsum.photos/id/700/300/200",
    },
    {
      id: "701",
      title: "701",
      coordinate: { latitude: 33.016331, longitude: -96.501219 },
      uri: "https://picsum.photos/id/701/300/200",
    },
    {
      id: "702",
      title: "702",
      coordinate: { latitude: 33.012358, longitude: -96.496647 },
      uri: "https://picsum.photos/id/702/300/200",
    },
    {
      id: "703",
      title: "703",
      coordinate: { latitude: 33.022768, longitude: -96.495747 },
      uri: "https://picsum.photos/id/703/300/200",
    },
  ]);

  const createPost = (post) => setResults((r) => [...r, post]);

  return (
    <StoreContext.Provider value={{ results, createPost }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

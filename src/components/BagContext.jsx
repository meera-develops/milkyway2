import { createContext, useContext, useState } from 'react';

const BagContext = createContext(null);

export function BagProvider({ children }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);

  const openBag = () => setBagOpen(true);
  const closeBag = () => setBagOpen(false);

  // These will be fleshed out in later steps
  const addItem = () => {};
  const removeItem = () => {};

  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BagContext.Provider value={{ bagOpen, openBag, closeBag, bagItems, bagCount, addItem, removeItem }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) throw new Error('useBag must be used inside a <BagProvider>');
  return context;
}
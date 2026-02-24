import { createContext, useContext, useState, useCallback } from 'react';

const BagContext = createContext(null);

export function BagProvider({ children }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);

  const openBag = useCallback(() => setBagOpen(true), []);
  const closeBag = useCallback(() => setBagOpen(false), []);

  const addItem = useCallback((item) => {
    setBagItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setBagItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setBagItems((prev) => {
      return prev.reduce((acc, item) => {
        if (item.id !== id) return [...acc, item];
        const newQty = item.quantity + delta;
        if (newQty <= 0) return acc; // drop the item entirely
        return [...acc, { ...item, quantity: newQty }];
      }, []);
    });
  }, []);

  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BagContext.Provider value={{ bagOpen, openBag, closeBag, bagItems, bagCount, addItem, removeItem, updateQuantity }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) throw new Error('useBag must be used inside a <BagProvider>');
  return context;
}
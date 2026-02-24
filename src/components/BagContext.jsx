import { createContext, useContext, useState, useCallback} from 'react';

const BagContext = createContext(null);

export function BagProvider({ children }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);

  const openBag = () => setBagOpen(true);
  const closeBag = () => setBagOpen(false);

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
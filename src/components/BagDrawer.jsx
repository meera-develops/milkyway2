import { useBag } from './BagContext';
import './BagDrawer.css';

const mockItem = {
  id: 1,
  name: 'Iced Caramel Latte',
  price: 5,
  quantity: 4,
};

function BagDrawer() {
  const { bagOpen, closeBag } = useBag();

  return (
    <>
      {/* Overlay */}
      <div
        className={`bag-overlay ${bagOpen ? 'active' : ''}`}
        onClick={closeBag}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`bag-drawer ${bagOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Order bag"
      >
        <div className="bag-drawer-header">
          <h2>Your Bag</h2>
          <button className="bag-close-btn" onClick={closeBag} aria-label="Close bag">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="bag-drawer-body">

          {/* Mock item — remove this in a future step */}
          <div className="bag-item">
            <div className="bag-item-info">
              <span className="bag-item-name">{mockItem.name}</span>
              <span className="bag-item-price">${(mockItem.price / 100 * mockItem.quantity).toFixed(2)}</span>
            </div>
            <div className="bag-item-controls">
              <div className="bag-item-qty">
                <button className="qty-btn" aria-label="Decrease quantity">−</button>
                <span>{mockItem.quantity}</span>
                <button className="qty-btn" aria-label="Increase quantity">+</button>
              </div>
              <button className="bag-item-remove" aria-label="Remove item">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default BagDrawer;
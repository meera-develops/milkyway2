import { useBag } from './BagContext';
import './BagDrawer.css';

function BagDrawer() {
  const { bagOpen, closeBag, bagItems, removeItem, updateQuantity } = useBag();

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
          {bagItems.length === 0 ? (
            <p className="bag-empty-msg">Your bag is empty.</p>
          ) : (
            bagItems.map((item) => (
              <div className="bag-item" key={item.id}>
                <div className="bag-item-info">
                  <span className="bag-item-name">{item.name}</span>
                  <span className="bag-item-price">
                    ${(Math.round(item.price * item.quantity * 100) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="bag-item-controls">
                  <div className="bag-item-qty">
                    <button
                      className="qty-btn"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, -1)}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, 1)}
                    >+</button>
                  </div>
                  <button
                    className="bag-item-remove"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {bagItems.length > 0 && (
          <div className="bag-drawer-footer">
            <div className="bag-subtotal">
              <span>Subtotal</span>
              <span>
                ${bagItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BagDrawer;
import menuImg from '../assets/img/milkyway-menu.png';
import { useBag } from '../components/BagContext';

const drinks = [
  { id: 'drink-1', name: 'Hot Coffee', price: 3.50 },
  { id: 'drink-2', name: 'House Cappuccino', price: 7.00 },
  { id: 'drink-3', name: 'Hot Tea', price: 2.00 },
  { id: 'drink-4', name: 'Mocha Macchiato', price: 6.00 },
  { id: 'drink-5', name: "Strawberries n' Cream", price: 5.00 },
  { id: 'drink-6', name: 'Caramel Latte', price: 5.00 },
  { id: 'drink-7', name: 'The Milky Way', price: 7.00 },
];

const food = [
  { id: 'food-1', name: 'Croissants', price: 2.00 },
  { id: 'food-2', name: 'Breakfast Panini', price: 6.00 },
  { id: 'food-3', name: 'Vegan Panini', price: 7.00 },
  { id: 'food-4', name: 'Muffins', price: 3.00 },
  { id: 'food-5', name: 'Cake Pops', price: 3.00 },
  { id: 'food-6', name: 'Soup of the Day', price: 4.00 },
  { id: 'food-7', name: 'Coffee Cake', price: 5.00 },
];

const addOns = [
  { id: 'addOns-1', name: 'Noise Cancelling Headphones', price: 5.00 },
  { id: 'addOns-2', name: 'Blue-Light Glasses', price: 3.00 },
];

function Menu() {
  const { addItem } = useBag();


  const renderItems = (items) =>
    items.map((item) => (
      <div className="menu-item" key={item.id}>
        <span className="menu-item-name">{item.name}</span>
        <div className="menu-item-right">
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
          <button
            className="menu-add-btn"
            aria-label={`Add ${item.name} to bag`}
            onClick={() => addItem(item)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    ));

  return (
    <section className="menu-page">
      <h1>Our Menu</h1>
      <p className="menu-subtitle">Est. 2026 &bull; Orlando, Florida</p>

      <div className="menu-image-wrapper">
        <img src={menuImg} alt="Milky Way Cafe full menu" />
      </div>

      <div className="menu-tables">
        <div className="menu-category">
          <h2>Drinks</h2>
          {renderItems(drinks)}
        </div>

        <div className="menu-category">
          <h2>Food</h2>
          {renderItems(food)}
        </div>

        <div className="menu-category">
          <h2>Add-Ons</h2>
          {renderItems(addOns)}
        </div>
      </div>
    </section>
  );
}

export default Menu;

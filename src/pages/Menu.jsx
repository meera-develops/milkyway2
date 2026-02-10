import menuImg from '../assets/img/milkyway-menu.png';

function Menu() {
  const drinks = [
    { name: 'Hot Coffee', price: '$3.50' },
    { name: 'House Cappuccino', price: '$7.00' },
    { name: 'Hot Tea', price: '$2.00' },
    { name: 'Mocha Macchiato', price: '$6.00' },
    { name: "Strawberries n' Cream", price: '$5.00' },
    { name: 'Caramel Latte', price: '$5.00' },
    { name: 'The Milky Way', price: '$7.00' },
  ];

  const food = [
    { name: 'Croissants', price: '$2.00' },
    { name: 'Breakfast Panini', price: '$6.00' },
    { name: 'Vegan Panini', price: '$7.00' },
    { name: 'Muffins', price: '$3.00' },
    { name: 'Cake Pops', price: '$3.00' },
    { name: 'Soup of the Day', price: '$4.00' },
    { name: 'Coffee Cake', price: '$5.00' },
  ];

  const addOns = [
    { name: 'Noise Cancelling Headphones', price: '$5.00' },
    { name: 'Blue-Light Glasses', price: '$3.00' },
  ];

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
          {drinks.map((item, i) => (
            <div className="menu-item" key={i}>
              <span className="menu-item-name">{item.name}</span>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="menu-category">
          <h2>Food</h2>
          {food.map((item, i) => (
            <div className="menu-item" key={i}>
              <span className="menu-item-name">{item.name}</span>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="menu-category">
          <h2>Add-Ons</h2>
          {addOns.map((item, i) => (
            <div className="menu-item" key={i}>
              <span className="menu-item-name">{item.name}</span>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;

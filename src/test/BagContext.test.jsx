import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BagProvider, useBag } from '../components/BagContext';

// Helper component that exposes bag actions via buttons for easy testing
function TestConsumer() {
  const { bagItems, bagCount, addItem, removeItem, updateQuantity } = useBag();

  return (
    <div>
      <span data-testid="count">{bagCount}</span>
      <span data-testid="items">{JSON.stringify(bagItems)}</span>

      <button onClick={() => addItem({ id: 1, name: 'Burger', price: 9.99 })}>
        Add Burger
      </button>
      <button onClick={() => addItem({ id: 2, name: 'Fries', price: 3.49 })}>
        Add Fries
      </button>
      <button onClick={() => removeItem(1)}>Remove Burger</button>
      <button onClick={() => updateQuantity(1, 1)}>Increase Burger</button>
      <button onClick={() => updateQuantity(1, -1)}>Decrease Burger</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <BagProvider>
      <TestConsumer />
    </BagProvider>
  );
}

describe('BagContext', () => {
  test('bag starts empty', () => {
    renderWithProvider();
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(JSON.parse(screen.getByTestId('items').textContent)).toEqual([]);
  });

  test('adding an item increases count to 1', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  test('adding the same item again increments quantity instead of duplicating', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    await userEvent.click(screen.getByText('Add Burger'));
    const items = JSON.parse(screen.getByTestId('items').textContent);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
    expect(screen.getByTestId('count').textContent).toBe('2');
  });

  test('adding different items creates separate entries', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    await userEvent.click(screen.getByText('Add Fries'));
    const items = JSON.parse(screen.getByTestId('items').textContent);
    expect(items).toHaveLength(2);
  });

  test('removeItem removes the item from the bag', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    await userEvent.click(screen.getByText('Remove Burger'));
    expect(JSON.parse(screen.getByTestId('items').textContent)).toEqual([]);
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  test('updateQuantity +1 increments item quantity', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    await userEvent.click(screen.getByText('Increase Burger'));
    const items = JSON.parse(screen.getByTestId('items').textContent);
    expect(items[0].quantity).toBe(2);
  });

  test('updateQuantity -1 decrements item quantity', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger'));
    await userEvent.click(screen.getByText('Increase Burger')); // qty = 2
    await userEvent.click(screen.getByText('Decrease Burger')); // qty = 1
    const items = JSON.parse(screen.getByTestId('items').textContent);
    expect(items[0].quantity).toBe(1);
  });

  test('updateQuantity -1 when quantity is 1 removes the item entirely', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText('Add Burger')); // qty = 1
    await userEvent.click(screen.getByText('Decrease Burger')); // should drop to 0 → removed
    expect(JSON.parse(screen.getByTestId('items').textContent)).toEqual([]);
  });

  test('useBag throws outside of BagProvider', () => {
    // Suppress expected React error output
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useBag must be used inside a <BagProvider>'
    );
    spy.mockRestore();
  });
});

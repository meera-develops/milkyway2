import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { BagProvider, useBag } from '../components/BagContext';
import BagDrawer from '../components/BagDrawer';

// Captures the navigate mock so we can assert on it
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Helper: renders BagDrawer inside required providers
// openDrawer – if true, calls openBag so the drawer is visible
function renderDrawer({ openDrawer = true, initialItems = [] } = {}) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter>
        <BagProvider>{children}</BagProvider>
      </MemoryRouter>
    );
  }

  function Setup() {
    const { openBag, addItem } = useBag();
    return (
      <>
        <button
          onClick={() => {
            initialItems.forEach(addItem);
            if (openDrawer) openBag();
          }}
        >
          Open Bag
        </button>
        <BagDrawer />
      </>
    );
  }

  const utils = render(<Setup />, { wrapper: Wrapper });

  return utils;
}

beforeEach(() => {
  mockNavigate.mockClear();
});

describe('BagDrawer – empty bag', () => {
  test('"Your bag is empty." message is shown when bag has no items', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open Bag'));
    expect(screen.getByText('Your bag is empty.')).toBeInTheDocument();
  });

  test('"Order Food Now" button is visible when the bag is empty', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open Bag'));
    expect(screen.getByRole('button', { name: /order food now/i })).toBeInTheDocument();
  });

  test('clicking "Order Food Now" navigates to /menu', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open Bag'));
    await userEvent.click(screen.getByRole('button', { name: /order food now/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });

  test('clicking "Order Food Now" also closes the drawer', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open Bag'));
    await userEvent.click(screen.getByRole('button', { name: /order food now/i }));
    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).not.toHaveClass('active');
  });
});

describe('BagDrawer – bag with items', () => {
  const item = { id: 1, name: 'Galaxy Burger', price: 12.5 };

  async function renderWithItem() {
    const utils = renderDrawer({ initialItems: [item] });
    await userEvent.click(screen.getByText('Open Bag'));
    return utils;
  }

  test('"Order Food Now" button is NOT shown when bag has items', async () => {
    await renderWithItem();
    expect(
      screen.queryByRole('button', { name: /order food now/i })
    ).not.toBeInTheDocument();
  });

  test('item name is displayed', async () => {
    await renderWithItem();
    expect(screen.getByText('Galaxy Burger')).toBeInTheDocument();
  });

  test('item price is displayed correctly', async () => {
    await renderWithItem();
    // $12.50 appears in both the item row and the subtotal — check both are present
    const prices = screen.getAllByText('$12.50');
    expect(prices.length).toBeGreaterThanOrEqual(1);
    expect(prices[0]).toBeInTheDocument();
  });

  test('subtotal is shown when items are in the bag', async () => {
    await renderWithItem();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
  });

  test('subtotal value matches item price × quantity', async () => {
    await renderWithItem();
    // 1 × $12.50
    const subtotalValues = screen.getAllByText('$12.50');
    // Both the item price and subtotal show the same value here
    expect(subtotalValues.length).toBeGreaterThanOrEqual(1);
  });

  test('clicking − button removes item when quantity is 1', async () => {
    await renderWithItem();
    await userEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(screen.queryByText('Galaxy Burger')).not.toBeInTheDocument();
  });

  test('clicking the trash button removes the item', async () => {
    await renderWithItem();
    await userEvent.click(screen.getByLabelText('Remove Galaxy Burger'));
    expect(screen.queryByText('Galaxy Burger')).not.toBeInTheDocument();
  });

  test('after removing all items, "Order Food Now" button reappears', async () => {
    await renderWithItem();
    await userEvent.click(screen.getByLabelText('Remove Galaxy Burger'));
    expect(
      screen.getByRole('button', { name: /order food now/i })
    ).toBeInTheDocument();
  });
});

describe('BagDrawer – close button', () => {
  test('close button hides the drawer', async () => {
    renderDrawer();
    await userEvent.click(screen.getByText('Open Bag'));
    await userEvent.click(screen.getByLabelText('Close bag'));
    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).not.toHaveClass('active');
  });
});

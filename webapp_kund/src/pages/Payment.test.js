import { render, cleanup } from '@testing-library/react';
import Payment from './Payment';

afterEach(cleanup);

test('displays payment information', () => {
  const balance = 50;
  const { getByText } = render(<Payment balance={balance} setBalance={jest.fn()} user={{}} />);

  expect(getByText(/Payment/i)).toBeInTheDocument();
  expect(getByText(`Balance: ${balance} sek`)).toBeInTheDocument();
});

test('Add button exists', () => {
  const { container } = render(<Payment balance={100} setBalance={() => {}} user={{}} />);
  const addBtn = container.querySelector('button');

  expect(addBtn).toBeInTheDocument();
});

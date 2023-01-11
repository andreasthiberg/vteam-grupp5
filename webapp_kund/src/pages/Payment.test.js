import { render, cleanup } from '@testing-library/react';
import Payment from './Payment';

afterEach(cleanup);

test('displays payment information', () => {
  const balance = 50;
  const { getByText } = render(<Payment balance={balance} setBalance={jest.fn()} user={{}} />);

  expect(getByText(/Payment/i)).toBeInTheDocument();
  expect(getByText(`Balance: ${balance} sek`)).toBeInTheDocument();
});
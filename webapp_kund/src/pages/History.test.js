import { render, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import History from './History';

afterEach(cleanup);

const mockUser = { id: 1 };
const mockTrips = [
  {
    id: 1,
    customer_id: 1,
    start_time: 1673192186000,
    city: 'Lund',
    price: 50,
  },
  {
    id: 2,
    customer_id: 1,
    start_time: 1673292186000,
    city: 'Lund',
    price: 30,
  },
  {
    id: 3,
    customer_id: 2,
    start_time: 1673195186000,
    city: 'Stockholm',
    price: 300,
  },
];

const historyModel = {
  async getAllHistory() {
    return { trips: mockTrips };
  },
};
jest.mock('./../models/history', () => ({
  __esModule: true,
  default: historyModel,
}));

test('displays history info filtered by user id', () => {
  act(() => {
    const { getByText } = render(<History user={mockUser} />);
    const firstTrip = mockTrips[0];
    const secondTrip = mockTrips[1];
    expect(getByText(firstTrip.city)).toBeInTheDocument();
    expect(getByText(secondTrip.city)).toBeInTheDocument();
    expect(getByText(mockTrips[2].city)).not.toBeInTheDocument();
  })
});

// test('displays details when view button is clicked', () => {
//   const { getByText, getByTestId } = render(<History user={mockUser} />);

//   const firstTrip = mockTrips[0];
//   const button = getByText('View');
//   fireEvent.click(button);

//   const details = getByTestId('details');
//   expect(details).toBeInTheDocument();
//   expect(getByText(firstTrip.city)).toBeInTheDocument();
// });

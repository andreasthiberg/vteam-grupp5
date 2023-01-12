import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

const mockUser = {
  first_name: 'Mumin',
  last_name: 'Troll',
  email: 'mumintroll@email.com',
};

const mockSetJwt = jest.fn();
const mockSetLoggedIn = jest.fn();
const mockSetUserEmail = jest.fn();
const mockSetBalance = jest.fn();

afterEach(cleanup);

test('displays personal infor, usage history and payment management', () => {
    const { getByText } = render(
        <Home
            user={mockUser}
            balance={500}
            setBalance={mockSetBalance}
            setJwt={mockSetJwt}
            setUserEmail={mockSetUserEmail}
            setLoggedIn={mockSetLoggedIn}
        />,
        {
            wrapper: MemoryRouter,
        }
    );
    expect(getByText(/Personal Info/i)).toBeInTheDocument();
    expect(getByText(/Usage history/i)).toBeInTheDocument();
    expect(getByText(/Payment management/i)).toBeInTheDocument();
    expect(getByText(/First Name:/i)).toBeInTheDocument();
    expect(getByText(/Last Name:/i)).toBeInTheDocument();
    expect(getByText(/Email:/i)).toBeInTheDocument();
    expect(getByText(mockUser.first_name)).toBeInTheDocument();
    expect(getByText(mockUser.last_name)).toBeInTheDocument();
    expect(getByText(mockUser.email)).toBeInTheDocument();
});

test('change to payment management', () => {
    const { getByText } = render(
        <Home
            user={mockUser}
            balance={500}
            setBalance={mockSetBalance}
            setJwt={mockSetJwt}
            setUserEmail={mockSetUserEmail}
            setLoggedIn={mockSetLoggedIn}
        />,
        {
            wrapper: MemoryRouter,
        }
    );
    fireEvent.click(getByText(/Payment management/i));
    expect(getByText(/Payment management/i)).toBeInTheDocument();
    expect(getByText(/Balance:/i)).toBeInTheDocument();
    expect(getByText(`Balance: ${500} sek`)).toBeInTheDocument();
});

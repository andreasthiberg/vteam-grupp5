import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import Login from './Login';

const mockUserEmail = 'test@email.com';
const mockJWT = 'mock-jwt-token';
const mockSetJwt = jest.fn();
const mockSetUserEmail = jest.fn();
const mockSetLoggedIn = jest.fn();
const oAuthUrl = 'http://localhost:3000/auth/oauth';
const stateString = 'mock-state-string';
let history;

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
            result: {
                token: mockJWT,
                email: mockUserEmail
            }
        }),
        status: 200
    }));
    history = createMemoryHistory()
});

afterEach(() => {
    global.fetch.mockClear();
    cleanup();
});

test('displays login page when user is not logged in', async () => {
    const { getByText } = render(
        <Login
            jwt=""
            setJwt={mockSetJwt}
            setUserEmail={mockSetUserEmail}
            setLoggedIn={mockSetLoggedIn}
        />
    );
    expect(getByText(/Welcome!/i)).toBeInTheDocument();
    expect(getByText(/Klicka här för att logga in med GitHub/i)).toBeInTheDocument();
});

test('logs user in and redirects to home page when code and state match', async () => {
    history.push('/login?code=mock-code&state=mock-state-string');
    const { findByText } = render(
        <Login
            jwt=""
            setJwt={mockSetJwt}
            setUserEmail={mockSetUserEmail}
            setLoggedIn={mockSetLoggedIn}
        />,
        {
            wrapper: ({ children }) => <Router history={history}>{children}</Router>,
        }
    );

    await act(async () => {
        expect(fetch).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/auth/oauth", {"body": "{\"code\":\"mock-code\"}", "headers": {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*", "Accept": "application/json"}, "method": "POST"});
        expect(mockSetJwt).toHaveBeenCalledWith(mockJWT);
        expect(mockSetUserEmail).toHaveBeenCalledWith(mockUserEmail);
        expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
        expect(history.location.pathname).toEqual('/')
    });
});
``

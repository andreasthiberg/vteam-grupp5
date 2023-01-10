import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn(); // mock function
const navigation = () => false;

test('testing authfield for login', async () => {
    const title = "Logga in";
    const { getAllByText, getByTestId, getByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />); 

    // testing if 2 title-elements exists
    // getByText returns error (multiple title-elements exists)
    const titleElements = await getAllByText(title);
    expect(titleElements.length).toBe(2);

    // testing if email/password exist using testId
    const emailField = await getByTestId("email-field");
    const passwordField = await getByTestId("password-field");
    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    // testing if fakeEmail/Password exists in auth email
    const fakeEmail = "test@email.com";
    fireEvent.changeText(emailField, fakeEmail);
    expect(auth?.email).toEqual(fakeEmail);

    const fakePassword = "test1234";
    fireEvent.changeText(passwordField, fakePassword);
    expect(auth?.password).toEqual(fakePassword);

    // testning for press button 
    // fireEvent.press(submitButton);
    // expect(mockSubmit).toHaveBeenCalled();
});

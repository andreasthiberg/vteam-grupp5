// import 'react-native';
// //import Home from './../components/Home';
// import { render, fireEvent } from '@testing-library/react-native';
// import RunScooter from './../components/RunScooter';

// describe('RunScooter', () => {
//     let route;
//     let setRunning;
//     let setScooterId;
//     let user;

//     beforeEach(() => {
//         route = { params: { item: { id: '123', status: 'available', pos: '1,1', battery: 50, city: 'San Francisco' } } };
//         setRunning = jest.fn();
//         setScooterId = jest.fn();
//         user = { id: 'abc' };
//     });

//     it('renders the correct scooter details', () => {
//         const { getByText } = render(
//             <RunScooter route={route} setRunning={setRunning} setScooterId={setScooterId} user={user} />
//         );

//         expect(getByText('Scooter ID: 123')).toBeDefined();
//         expect(getByText('Status: available')).toBeDefined();
//         expect(getByText('Position: 1,1')).toBeDefined();
//         expect(getByText('Battery: 50%')).toBeDefined();
//     });

//     it('renders the activate button when the scooter is not running', () => {
//         const { getByTestId } = render(
//             <RunScooter route={route} setRunning={setRunning} setScooterId={setScooterId} user={user} />
//         );

//         expect(getByTestId('activate-button')).toBeDefined();
//     });

//     it('renders a message when the scooter is running', () => {
//         route.params.item.running = true;
//         const { getByText } = render(
//             <RunScooter route={route} setRunning={setRunning} setScooterId={setScooterId} user={user} />
//         );

//         expect(getByText('You have activated scooter')).toBeDefined();
//     });

//     it('calls setRunning and setScooterId when the activate button is pressed', () => {
//         const { getByTestId } = render(
//             <RunScooter route={route} setRunning={setRunning} setScooterId={setScooterId} user={user} />
//         );

//         const activateButton = getByTestId('activate-button');
//         activateButton.props.onPress();

//         expect(setRunning).toHaveBeenCalledWith(true);
//         expect(setScooterId).toHaveBeenCalledWith('123');
//     });
// });

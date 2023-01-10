import { render, fireEvent, screen } from '@testing-library/react-native';
import  CityList from '../components/CityList';
import { createNavigationContainer } from '@react-navigation/native';

describe("Test for CityList Component", () => {
	let navigation;

  	beforeEach(() => {
		navigation = { navigate: jest.fn() };
	});

	it("render with 3 buttons", async () => {
		render(<CityList />);
		const buttonList = await screen.findAllByRole("button");
		expect(buttonList).toHaveLength(3);
	});

	it('renders all the cities', async () => {
		const { getByText } = render(<CityList navigation={navigation} />);

		expect(getByText("Please select your city")).toBeTruthy();
		expect(getByText("Stockholm")).toBeTruthy();
		expect(getByText("Malmö")).toBeTruthy();
		expect(getByText("Lund")).toBeTruthy();
	});

	it('navigates to the correct screen when a button is pressed', async () => {
		const { getByText } = render(<CityList navigation={navigation} />);
	
		const stockholmButton = getByText("Stockholm");
		const malmoButton = getByText("Malmö");
		const lundButton = getByText("Lund");
	
		fireEvent.press(stockholmButton);
		expect(navigation.navigate).toHaveBeenCalledWith('Stockholm');
	
		fireEvent.press(malmoButton);
		expect(navigation.navigate).toHaveBeenCalledWith('Malmo');
	
		fireEvent.press(lundButton);
		expect(navigation.navigate).toHaveBeenCalledWith('Lund');
	  });
});

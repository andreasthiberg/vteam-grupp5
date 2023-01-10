// import { render, screen } from "@testing-library/react-native";
// import { SCOOTER_QUERY, ScooterList } from './../components/ScooterList';
// import { MockedProvider } from "@apollo/client/testing";


// describe("Test for ScooterList Component", () => {

//     it("renders without error", async () => {
//         const scooterMock = [
//             {
//                 request: {
//                     query: SCOOTER_QUERY,
//                     variables: {
//                         id: 5,
//                         status: 1,
//                         pos: "[55,13]",
//                         battery: 80,
//                         city: 'Stockholm'
//                     },
//                     result: {
//                         data: {
//                             scooters: {id: 5, status: 1, pos: "[55,13]", battery: 80, city: "Stockholm"}
//                         }
//                     }
//                 }
//             }
//         ];
//         render(
//           <MockedProvider mocks={scooterMock} addTypename={false}>
//             <ScooterList />
//           </MockedProvider>
//         );
//         expect(await screen.findByText("Loading...")).toBeInTheDocument();
//       });
// });

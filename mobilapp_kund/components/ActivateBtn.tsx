import { View, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';
import { Base } from "../styles";

export default function ActivateBtn({ setRunning, setScooterId, scooter_id, customer_id, start_pos, city }) {

    console.log("ActivateBtn: scooter_id::", scooter_id);

    const ADD_TRIP = gql`
        mutation AddTrip(
            $scooter_id: Int!,
            $customer_id: Int!,
            $start_pos: String!,
            $city: String!
            
        ){
            addTrip(
            scooter_id: $scooter_id
            customer_id: $customer_id
            start_pos: $start_pos
            city: $city
            )
        }  
    `;

    function updateScooterState () {
        console.log("Activate clicked............");
        setScooterId(scooter_id);
        setRunning(true);
    }

    const [addTrip, { data }] = useMutation(ADD_TRIP);
    console.log("Add Trip:", data);

    return(
        <View style={Base.btn2}>
            <Button
                title="Activate"
                color="white"
                onPress={() => {
                    addTrip({
                        variables: {
                            scooter_id: scooter_id,
                            customer_id: customer_id,
                            start_pos: start_pos,
                            city: city
                        }
                    });
                    updateScooterState();
                    
                }}
            />
        </View>
    )
}

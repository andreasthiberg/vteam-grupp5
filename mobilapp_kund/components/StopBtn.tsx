import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';
import { Base } from "../styles";

export default function DeactivateBtn({ item, setRunning, setScooterId }) {
    // const { item } = route.params;
    //console.log("DeactivateBtn props:", props);

    const scooter_id = item;

    const END_TRIP = gql`
        mutation EndTrip($id: Int!) {
            endTrip(id: $id)
          }   
    `;

    const [endTrip, { data }] = useMutation(END_TRIP);
    console.log("changed status:", data);
    
    function updateScooterState() {
        console.log("Stop clicked.....");
        setScooterId(0);
        setRunning(false);
    }

    return(
        <View style={Base.btn2}>
            <Button
                title="Stop" 
                color="white"
                onPress={() => {
                    ({
                        variables: {
                            id: scooter_id
                        }
                    });
                    updateScooterState();
                }}
            />
        </View>
    )
}

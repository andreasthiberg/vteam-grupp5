import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';

export default function DeactivateBtn({ item, setRunning, setScooterId }) {
    // const { item } = route.params;
    //console.log("DeactivateBtn props:", props);

    
    const scooter_id = item;

    console.log("DeactivateBtn: scooter_id:", scooter_id);

    const CHANGE_STATUS = gql`
        mutation UpdateScooter($id: Int!, $status: Int!) {
            updateScooter(id: $id, status: $status)
          }   
    `;

    const [updateScooter, { data }] = useMutation(CHANGE_STATUS);
    console.log("changed status:", data);
    //console.log("DeactivateBtn: scooter status", data.status);
    
    function updateScooterState() {
        console.log("Deactivate clicked.....");
        setScooterId(0);
        setRunning(false);
    }

    return(
        <Button
            title="Deactivate" 
            onPress={() => {
                updateScooter({
                    variables: {
                        id: scooter_id,
                        status: 1
                    }
                });
                updateScooterState();
            }}
        />
    )
}

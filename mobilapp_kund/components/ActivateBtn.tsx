import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';
import { Base } from "../styles";

export default function ActivateBtn({ item, setRunning, setScooterId }) {

    const scooter_id = item;

    console.log("ActivateBtn: scooter_id::", scooter_id);

    const CHANGE_STATUS = gql`
        mutation UpdateScooter($id: Int!, $status: Int!) {
            updateScooter(id: $id, status: $status)
          }   
    `;

    function updateScooterState () {
        console.log("Activate clicked............");
        setScooterId(scooter_id);
        setRunning(true);
    }

    const [updateScooter, { data }] = useMutation(CHANGE_STATUS);
    console.log("changed status to 2(activated):", data);

    return(
        <View style={Base.btn2}>
            <Button
                title="Activate"
                color="white"
                onPress={() => {
                    updateScooter({
                        variables: {
                            id: scooter_id,
                            status: 2
                        }
                    });
                    updateScooterState();
                }}
            />
        </View>
    )
}

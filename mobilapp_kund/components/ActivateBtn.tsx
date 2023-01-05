import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';

export default function ActivateBtn(props) {
    // const { item } = route.params;
    console.log("ActivateBtn props:", props);

    const scooter_id = props.item;

    console.log("scooter_id:", scooter_id);

    const CHANGE_STATUS = gql`
        mutation UpdateScooter($id: Int!, $status: Int!) {
            updateScooter(id: $id, status: $status)
          }   
    `;

    const [updateScooter, { data }] = useMutation(CHANGE_STATUS);
    console.log("changed status:", data);
    
    //props.setRunning(true);

    return(
        <Button
            title="Activate"
            onPress={() => {
                updateScooter({
                    variables: {
                        id: scooter_id,
                        status: 2
                    }
                })
            }}
        />
    )
}

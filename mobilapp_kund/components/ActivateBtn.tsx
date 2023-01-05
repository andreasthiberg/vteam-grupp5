import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';

export default function ActivateBtn(props) {
    //const { item } = route.params;
    //console.log("ActivateBtn props", props);

    const {scooter_id} = props.item;

    const CHANGE_STATUS = gql`
        mutation UpdateScooter($id: Int!, $status: Int!) {
            updateScooter(id: $id, status: $status)
          }   
    `;

    console.log("activate scooter")
    const [updateScooter, { data }] = useMutation(CHANGE_STATUS);
    console.log("changed status:", data);

    //FIXME: failed to pass id to Button

    return(
        <Button
            title="Activate" 
            onPress={() => {
                updateScooter({
                    variables: {
                        id: 5,
                        status: 2,
                    }
                })
            }}
        />
    )
}

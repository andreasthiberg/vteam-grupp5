import { View, Text, Button } from "react-native";
import { gql, useMutation } from '@apollo/client';
import { Base } from "../styles";
import tripModel from "./../models/trip";
import { useState, useEffect } from 'react';


export default function DeactivateBtn({ item, setRunning, setScooterId }) {
    // const { item } = route.params;
    //console.log("DeactivateBtn props:", props);

    const [ trips, setTrips ] = useState([]);
    const [ tripId, setTripId ] = useState(0);

    const scooterId = item;
    console.log("scooterId", scooterId);

    const END_TRIP = gql`
        mutation EndTrip($id: Int!) {
            endTrip(id: $id)
          }   
    `;

    useState(() => {
        (async() => {
            const allTrips = await tripModel.getAllTrips();
            setTrips(allTrips);
        });
    })

    const [endTrip, { data }] = useMutation(END_TRIP);
    console.log("changed status:", data);

    async function getTripId() {
        const ongoingTrip = trips
        .filter(item => item.scooter_id === scooterId);
        setTripId(ongoingTrip.id);
        console.log("tripId", tripId);
    }
    
    function updateScooterState() {
        console.log("Deactivate clicked.....");
        setScooterId(0);
        setRunning(false);
    }

    return(
        <View style={Base.btn2}>
            { tripId == 0 ?
            <Button
                title="Stop Running" 
                color="white"
                onPress={() => {
                    getTripId();
                }}
            />
            :
            <Button
                title="Deactivate" 
                color="white"
                onPress={() => {
                    endTrip({
                        variables: {
                            id: tripId
                        }
                    });
                    updateScooterState();
                }}
            />
            }
        </View>
    )
}

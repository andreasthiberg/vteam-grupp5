import { View, Text, Button } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Base } from "../styles";
//import tripModel from "./../models/trip";
import { useState, useEffect } from 'react';


export default function DeactivateBtn({ item, setRunning, setScooterId }) {
    const scooterId = item;

    const [ tripData, setTripData ] = useState([]);
    const [ trips, setTrips ] = useState([]);
    //const [ tripId, setTripId ] = useState(null); //too many render error

    let tripId = null;

    const TRIP_QUERY = gql`
        query TripQuery {
            trips {
                id
                scooter_id
            }
        }
    `;

    const { data: trip_data } = useQuery(TRIP_QUERY);
    //console.log("query trip data", trip_data);

    useEffect(() => {
        setTripData(trip_data);
    }, [trip_data]);

    useEffect(() => {
        if(trip_data) {
            setTrips(trip_data.trips);
        }
    }, [tripData]);

    if ( trips !== undefined) {
        trips
        .filter(item => item.scooter_id === scooterId)
        .map(item => {
            console.log(item.id);
            tripId = parseInt(item.id);
        });
    }

    const END_TRIP = gql`
        mutation EndTrip(
            $id: Int!
        ){
            endTrip(
                id: $id
            ){
                scooter_id,
                price
            }
        }   
    `;

    const [endTrip, { data }] = useMutation(END_TRIP);

    function updateScooterState() {
        setScooterId(0);
        setRunning(false);
    }

    return(
        <View style={Base.btn2}>
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
        </View>
    )
}

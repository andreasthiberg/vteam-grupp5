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
        //console.log(trips);
        trips
        .filter(item => item.scooter_id === scooterId)
        .map(item => {
            console.log(item.id);
            tripId = parseInt(item.id);
            //setTripId(item.id);
        });
    }

    // It works when I write in real number into tripId...
    const END_TRIP = gql`
        mutation EndTrip {
            endTrip(
                id: tripId
            ){
                scooter_id,
                price
            }
        }   
    `;

    const [endTrip, { data }] = useMutation(END_TRIP);
    console.log("endTrip mutation data", data);
    console.log("id..............", tripId);

    function updateScooterState() {
        console.log("Deactivate clicked.....");
        console.log("id.......", tripId);
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

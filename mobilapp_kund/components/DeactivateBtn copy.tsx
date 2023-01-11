import { View, Text, Button } from "react-native";
import { gql, useMutation, useQuery } from '@apollo/client';
import { Base } from "../styles";
import tripModel from "./../models/trip";
import { useState, useEffect } from 'react';
import trip from "./../models/trip";


export default function DeactivateBtn({ item, setRunning, setScooterId }) {
    const scooterId = item;

    //const [ allTrips, setAllTrips ] = useState([]);
    const [ tripId, setTripId ] = useState(0);

    const TRIP_QUERY = gql`
        query TripQuery {
            trips {
                id
                scooter_id
            }
        }
    `;

    useEffect( () => {
        (async() => {
            const { data: trip_data } = await useQuery(TRIP_QUERY);
            const allTrip = trip_data.trips
            const ongoingTrip = allTrip.filter(trip => trip.scooter_id === scooterId);
            const trip_id = ongoingTrip[0].id;

            setTripId(trip_id);
        })();
    }, []);

    //const tripId = getTripId();

    // useEffect(() => {
    //     setAllTrips(trip_data.trips);
    // }, []);

    // useEffect(() => {
    //     if (trip_data) {
    //         setAllTrips(trip_data.trips);
    //     }
    // }, []);

    // useEffect(() => {
    //     (async() => {
    //         let trips = await tripModel.getAllTrips();
    //         console.log("trips from model:", trips);
    //         setAllTrips(trips);
    //     })();
    // }, []);

    // if(tripData !== undefined) {
    //     console.log("tripData", tripData);

    //     const ongoingTrip = tripData.filter(trip => trip.scooter_id === scooterId);
    //     console.log(ongoingTrip);

    //     //const ongoingTrip = allTrips.trips.filter(trip => trip.scooter_id === scooterId);
        
    //     setTripId(ongoingTrip[0].id);
    // }

    // console.log("trips", trips);
    //console.log("tripId_________", tripId);

    const END_TRIP = gql`
        mutation EndTrip {
            endTrip(
                id: $tripId
            ){
                scooter_id,
                price
            }
        }   
    `;

    const [endTrip, { data }] = useMutation(END_TRIP);
    console.log("Deactivated scooter:", data);

    // async function getTripId() {
    //     console.log("trip in getTripId", trips, scooterId)
    //     const ongoingTrip = await trips.trips.filter(trip => trip.scooter_id === scooterId);
        
    //     console.log("ongoingTrip", ongoingTrip, ongoingTrip[0].id);

    //     setTripId(ongoingTrip[0].id);
    //     console.log("tripId...", tripId);
    // }
    
    function updateScooterState() {
        console.log("TripID.......", tripId);
        console.log("Deactivate clicked.....");
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

# Program that simulates a number of scooter brains

import sys
import requests
import time
from src.scooter import Scooter

class ScooterSimulation():
    """Starts simulating a given amount of scooters."""

    def __init__(self):
        self.scooter_array = []

    def start(self):
        """ Start simulation """

        # Wait for backend to start fully
        time.sleep(5)

        print("Starting scooter simulation...")

        # Get current highest ID of scooters in database
        url = "http://backend:3000/graphql"        
        body = "{scooters{id}}"
        response = requests.post(url=url, json={"query": body})
        responseJson = response.json()
        scooterIdArray = responseJson["data"]["scooters"]
        startId = int(scooterIdArray[-1]["id"] + 1)

        numberOfScooters = 30

        startCoords = [[5570000, 1319000],[5560500, 1300380],[5933000, 1805500]]

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            newScooter = Scooter(startId+x,startCoords[2],1,x+1,"Stockholm")
            newScooter.add_to_database()
            newScooter.add_trip()
            self.scooter_array.append(newScooter)

        time.sleep(5)

        # Call update method continuously
        while True:
            self.get_update()


    def get_update(self):
        """ Tells every scooter to send and update and then wait x seconds """
        for scooter in self.scooter_array:
            scooter.send_update()
        print("Simulation update sent.")
        time.sleep(2)
        
    @staticmethod
    def quit():
        """ Quit the simulation """
        sys.exit()
        
if __name__ == "__main__":
    sim = ScooterSimulation()
    sim.start()
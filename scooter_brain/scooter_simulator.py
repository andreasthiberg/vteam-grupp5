# Program that simulates a number of scooter brains

import sys
import requests
import time
import json
from src.scooter import Scooter

class ScooterSimulation():
    """Starts simulating a given amount of scooters."""

    def __init__(self):
        self.scooterArray = []

    def start(self):
        """ Start simulation """

        # Wait for backend to start fully
        time.sleep(5)

        print("Starting scooter simulation...")

        # Create brains for scooters already in database
        url = "http://backend:3000/graphql"        
        body = "{scooters{id,status,pos,city,battery}}"
        response = requests.post(url=url, json={"query": body})
        responseJson = response.json()
        dbScooters = responseJson["data"]["scooters"]

        for scooter in dbScooters:
            coordArray = json.loads(scooter["pos"])
            newScooter = Scooter(scooter["id"],[coordArray[0]*100000,coordArray[1]*100000],scooter["status"],scooter["city"])
            self.scooterArray.append(newScooter)

        # Get current highest ID of scooters in database
        lastScooterId = self.scooterArray[-1].get_id()
        startId = lastScooterId + 1
        numberOfScooters = 30

        # Coords for Lund, Malmö, Stockholm
        startCoords = [[5570000, 1319000],[5560500, 1300380],[5933000, 1805500]]

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            newScooter = Scooter(startId+x,startCoords[2],1,"Stockholm",x+1)
            newScooter.add_to_database()
            newScooter.add_trip()
            self.scooterArray.append(newScooter)

        time.sleep(5)

        # Call update method continuously
        while True:
            self.get_update()


    def get_update(self):
        """ Tells every scooter to send and update and then wait x seconds """
        for scooter in self.scooterArray:
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
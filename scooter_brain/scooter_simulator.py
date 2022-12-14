# Program that simulates a number of scooter brains

import sys
import requests
import time
import json
import random
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
        numberOfScooters = 300

        # Coords for Lund, Malmö, Stockholm
        coords = [5933000, 1805500]

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            randomIntX = random.randint(5927099,5938191)
            randomIntY = random.randint(1789754,1816411)
            newScooter = Scooter(startId+x,[randomIntX,randomIntY],1,"Stockholm",x+2)
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
        time.sleep(1)
        
    @staticmethod
    def quit():
        """ Quit the simulation """
        sys.exit()
        
if __name__ == "__main__":
    sim = ScooterSimulation()
    sim.start()
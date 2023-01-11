# Program that simulates a number of scooter brains

import sys
import requests
import time
import json
import random
import math
from src.scooter import Scooter

class ScooterSimulation():
    """Starts simulating a given amount of scooters."""

    def __init__(self):
        self.scooterArray = []

    def start(self):
        """ Start simulation """

        # Wait for backend to start fully
        time.sleep(5)

        print("Requesting initial parking analysis...")

        url = "http://backend:3000/graphql"        
        body = "mutation{initialParkingCheck}"
        response = requests.post(url=url, json={"query": body})
        time.sleep(1)

        print("Starting scooter simulation...")

        # Create brains for scooters already in database
        url = "http://backend:3000/graphql"        
        body = "{scooters{id,status,pos,city,battery}}"
        response = requests.post(url=url, json={"query": body})
        responseJson = response.json()
        dbScooters = responseJson["data"]["scooters"]
        
        for scooter in dbScooters:
            coordArray = json.loads(scooter["pos"])
            newScooter = Scooter(scooter["id"],[coordArray[0]*100000,coordArray[1]*100000],scooter["status"],scooter["city"],scooter["battery"])
            self.scooterArray.append(newScooter)
    

        # Get current highest ID of scooters in database
        lastScooterId = self.scooterArray[-1].get_id()
        startId = lastScooterId + 2
        numberOfScooters = 300

        # Create demonstration scooter simulation
        endPoint=[5932558, 1807059]
        startPoint=[5932655, 1807424]
        dx = endPoint[0] - startPoint[0]
        dy = endPoint[1] - startPoint[1]
        angle = math.atan2(dy, dx)
        newScooter = Scooter(startId-1,[5932654, 1807415],1,"Stockholm",100,2,angle)
        newScooter.add_to_database()
        newScooter.add_trip()
        self.scooterArray.append(newScooter)

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            randomIntX = random.randint(5927099,5938191)
            randomIntY = random.randint(1789754,1816411)
            newScooter = Scooter(startId+x,[randomIntX,randomIntY],1,"Stockholm",100,x+3)
            newScooter.add_to_database()
            newScooter.add_trip()
            self.scooterArray.append(newScooter)

        print("Scooters and trips added to database.")
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
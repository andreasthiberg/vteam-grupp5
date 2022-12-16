# Program that simulates a number of scooter brains

import sys
import time
from src.scooter import Scooter

class ScooterSimulation():
    """Starts simulating a given amount of scooters."""

    def __init__(self):
        self.scooter_array = []

    def start(self):
        """ Start simulation """

        # Wait for backend to start fully
        time.sleep(3)

        numberOfScooters = 3
        startId = 3
        startCoords = [[5570000, 1319000],[5560500, 1300380],[5933000, 1805500]]

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            newScooter = Scooter(startId+x,startCoords[x])
            newScooter.add_to_database()
            self.scooter_array.append(newScooter)

        time.sleep(3)

        # Call update method continuously
        while True:
            self.get_update()


    def get_update(self):
        """ Tells every scooter to send and update and then wait x seconds """
        for scooter in self.scooter_array:
            scooter.send_update()
        time.sleep(5)
        
    @staticmethod
    def quit():
        """ Quit the simulation """
        sys.exit()
        
if __name__ == "__main__":
    sim = ScooterSimulation()
    sim.start()
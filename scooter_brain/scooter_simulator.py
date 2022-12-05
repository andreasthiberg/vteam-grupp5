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

        numberOfScooters = 3

        # Create a scooter objects and appends them to the array
        for x in range(numberOfScooters):
            newScooter = Scooter(x,[0,0])
            self.scooter_array.append(newScooter)

        time.sleep(3)

        # Call update method continuously
        while True:
            print("Uppdaterar...")
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
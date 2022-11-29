# Program that simulates a number of scooter brains

import sys
from src.scooter import Scooter

class ScooterSimulation():
    """Starts simulating a given amount of scooters."""

    def __init__(self):
        self.scooter_array = [Scooter(0,[0,0])]

    @staticmethod
    def quit():
        """ Quit the simulation """
        sys.exit()
        
    def start(self):
        """ Start simulation """

        while True:
            choice = input("Enter menu selection:\n-> ")
            print(choice)

if __name__ == "__main__":
    sim = ScooterSimulation
    sim.start()
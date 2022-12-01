# -*- coding: UTF-8 -*-

"""Scooter simulation class"""

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates every x seconds"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos

    def send_update(self):
        print("Hej från scooter " + str(self.id))

"""Scooter simulation class"""

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates every x seconds"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos

    
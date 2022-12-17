# -*- coding: UTF-8 -*-

"""Scooter simulation class"""

import requests
import json

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos
        self.battery = 100
        self.currentTrip = 0
        self.status = 1 # Status 0 = under underhåll, 1 = Tillgänglig, 2 = Kör, 3 = Parkerad utanför zon, 4 = Parkerad i zon, 5 = Parkerad i laddning, 6 = stoppad av admin

    # Sends update with current status and location to database
    def send_update(self):

        if(self.battery <= 0):
            print("Slut på batterier.")
        elif(self.status != 1):
            print("Statusen är inte 1 - scootern kör inte.")
        else:
            # Change location (Make more specific later)
            self.change_pos(20,10)

            # Reduce battery by one percent
            self.change_battery(-2)

        # GraphQL API URL
        url = "http://backend:3000/graphql"
        
        body = 'mutation {reportScooter (id:'
        body += str(self.id)
        body += ',pos:"'
        body += self.get_pos_as_coordinate_string()
        body += '",battery:'
        body += str(self.battery)
        body += ')}'

        response = requests.post(url=url, json={"query": body})

        responseJson = response.json()
        newStatus = responseJson["data"]["reportScooter"]

        if( newStatus != self.status):
            self.change_status(newStatus)
            print("Status changed to " + str(newStatus))
        
        print("response : ", response.content)
        print("Scooter with ID " + str(self.id) + " has position " + self.get_pos_as_coordinate_string() + ", status " + str(self.status) + " and " + str(self.battery) + "% battery left.")

    # Change current lat and long with factors dLa and dLo
    def change_pos(self,dLa,dLo):
        oldLa = self.pos[0]
        oldLo = self.pos[1]
        self.pos = [oldLa+dLa,oldLo+dLo]

    # Change current battery by x
    def change_battery(self,x):
        self.battery = self.battery + x

    # Change current battery by x
    def change_status(self,x):
        self.status = x

    # Returns current position in string format "[latitude,longitude]", changed from integer values in object.
    def get_pos_as_coordinate_string(self):
        coord_string = "[%s,%s]"%(str(self.pos[0]/100000),str(self.pos[1]/100000))
        return coord_string

    # Adds a new scooter to database with object's data
    def add_to_database(self):

        # GraphQL API URL
        url = "http://backend:3000/graphql"
        
        body = 'mutation {addScooter (pos:"%s",battery:100,status:1)}'%(self.get_pos_as_coordinate_string())

        response = requests.post(url=url, json={"query": body})
        print("response : ", response.content)

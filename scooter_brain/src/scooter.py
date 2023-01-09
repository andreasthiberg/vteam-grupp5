# -*- coding: UTF-8 -*-

"""Single scooter simulation class"""

import requests
import random
import math

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos, status, customerId, city):
        self.id = id
        self.customerId = customerId
        self.city = city
        self.pos = pos
        self.battery = 100
        self.currentTrip = 0
        self.status = status
        self.direction = math.radians(random.randint(1, 360))
        self.xMovement = math.cos(self.direction)
        self.yMovement = math.sin(self.direction)
        self.batteryIncrement = 0

    # Sends update with current status and location to database
    def send_update(self):

        # Send pos/battery and get status update #

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
            print("Status of scooter " + str(self.id) + " changed to " + str(newStatus))

        # Scooter is out of batteries
        if(self.battery <= 0):
            print("Slut på batterier.")

        # Scooter is moving
        elif(self.status == 1):
             # Change location
            self.change_pos(self.xMovement*10,self.yMovement*10)
            self.batteryIncrement += 1
            # Reduce battery by one percent
            if self.batteryIncrement > 9:
                self.change_battery(-1)
                self.batteryIncrement = 0

        # Scooter is charging
        if(self.status == 4):
            print(self.battery)
            print(self.id)
            if(self.battery < 100):
                print("Laddar")
                self.change_battery(1)

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
        
        body = 'mutation {addScooter (pos:"%s",battery:100,status:1,city:"Stockholm")}'%(self.get_pos_as_coordinate_string())

        response = requests.post(url=url, json={"query": body})
        print(response)

    def add_trip(self):

        url = "http://backend:3000/graphql"
        
        body = 'mutation {addTrip (scooter_id:%s,customer_id:%s,start_pos:"%s",city:"%s")}'%(self.id,
        self.customerId,self.get_pos_as_coordinate_string(),self.city)

        response = requests.post(url=url, json={"query": body})
        print(response)
        print("Trip for scooter with id " + str(self.id) + " added to database")

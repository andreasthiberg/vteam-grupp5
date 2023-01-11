# -*- coding: UTF-8 -*-

"""Single scooter simulation class"""

import requests
import random
import math
import json

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos, status,city,battery, customerId=0,direction = math.radians(random.randint(1, 360))):
        self.id = id
        self.customerId = customerId
        self.city = city
        self.pos = pos
        self.battery = battery
        self.currentTrip = 0
        self.status = status
        self.direction = direction
        self.xMovement = math.cos(self.direction)*4
        self.yMovement = math.sin(self.direction)*4
        self.batteryIncrement = 0
        self.movedToStation = False

    # Sends update with current status and location to database
    def send_update(self):

        # Send pos/battery, get status update #

        url = "http://backend:3000/graphql"
        
        body = 'mutation {reportScooter (id:'
        body += str(self.id)
        body += ',pos:"'
        body += self.get_pos_as_coordinate_string()
        body += '",battery:'
        body += str(self.battery)
        body += '){status,station}}'

        response = requests.post(url=url, json={"query": body})

        responseJson = response.json()
        newStatus = responseJson["data"]["reportScooter"]["status"]
        stationId = responseJson["data"]["reportScooter"]["station"]

        if( newStatus != self.status):
            self.change_status(newStatus)
            print("Status of scooter " + str(self.id) + " changed to " + str(newStatus))
            
        # Scooter is moving
        elif(self.status == 1):
             # Change location
            self.change_pos(self.xMovement*10,self.yMovement*10)
            self.batteryIncrement += 1
            # Reduce battery by one percent
            if self.batteryIncrement > 5:
                self.change_battery(-1)
                self.batteryIncrement = 0

        # Scooter is charging
        if(self.status == 4):
            if(self.battery < 100):
                self.change_battery(4)
            # Move position if charging
            if not self.movedToStation:
                    url = "http://backend:3000/graphql"
                    body = 'query {chargingStation(id:' + str(stationId) + '){id,pos}}'
                    response = requests.post(url=url, json={"query": body})
                    responseJson = response.json()
                    stationPos = responseJson["data"]["chargingStation"]["pos"]
                    posArray = json.loads(stationPos)
                    self.pos = [math.floor(posArray[0]*100000),math.floor(posArray[1]*100000)]
                    self.movedToStation = True

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

    def add_trip(self):

        url = "http://backend:3000/graphql"
        
        body = 'mutation {addTrip (scooter_id:%s,customer_id:%s,start_pos:"%s",city:"%s")}'%(self.id,
        self.customerId,self.get_pos_as_coordinate_string(),self.city)

        requests.post(url=url, json={"query": body})
        # print("Trip for scooter with id " + str(self.id) + " and customer with id " + str(self.customerId) + " added to database")

    def get_id(self):
        return self.id

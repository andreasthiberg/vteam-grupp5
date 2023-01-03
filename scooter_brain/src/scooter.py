# -*- coding: UTF-8 -*-

"""Single scooter simulation class"""

import requests

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos
        self.battery = 100
        self.currentTrip = 0
        self.status = 1
        # 0 = stoppad av admin
        # 1 = Kör
        # 2 = Parkerad utanför zon
        # 3 = Parkerad i parkeringszon
        # 4 = Parkerad i laddningszon
        # 5 = Slut på batterier och inte i laddningszon
        # 6 = Under underhåll (borta från kartan)

    # Sends update with current status and location to database
    def send_update(self):

        # Scooter is out of batteries
        if(self.battery <= 0):
            print("Slut på batterier.")

        # Scooter is moving
        elif(self.status == 1):
             # Change location
            self.change_pos(30*self.id,10*self.id)

            # Reduce battery by one percent
            self.change_battery(-1)

        # Scooter is charging
        elif(self.status == 4):
            if(self.battery < 100):
                self.change_battery(1)

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

        #print("Scooter with ID " + str(self.id) + " has position " + self.get_pos_as_coordinate_string() +
        #", status " + str(self.status) + " and " + str(self.battery) + "% battery left.")

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
        # print("response : ", response.content)

# -*- coding: UTF-8 -*-

"""Scooter simulation class"""

import requests

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos

    # Sends update with current status and location to database
    def send_update(self):

        # Change location (Make more specific later)
        self.change_pos(20,10)

        # GraphQL API URL
        url = "http://backend:3000/graphql"
        
        body = 'mutation {updateScooter (id:'
        body += str(self.id)
        body += ',pos:"'
        body += self.get_pos_as_coordinate_string()
        body += '")}'

        response = requests.post(url=url, json={"query": body})
        print("response status code: ", response.status_code)
        print("response : ", response.content)

    # Change current lat and long with factors dLa and dLo
    def change_pos(self,dLa,dLo):
        oldLa = self.pos[0]
        oldLo = self.pos[1]
        self.pos = [oldLa+dLa,oldLo+dLo]
        print(self.pos)
    
    # Returns current position in string format "[latitude,longitude]", changed from integer values in object.
    def get_pos_as_coordinate_string(self):
        coord_string = "[%s,%s]"%(str(self.pos[0]/100000),str(self.pos[1]/100000))
        print(coord_string)
        return coord_string

    # Adds a new scooter to database with object's data
    def add_to_database(self):

        # GraphQL API URL
        url = "http://backend:3000/graphql"
        
        body = 'mutation {addScooter (pos:"%s",battery:100,status:"1")}'%(self.get_pos_as_coordinate_string())

        print(body)
        response = requests.post(url=url, json={"query": body})
        print("response status code: ", response.status_code)
        print("response : ", response.content)

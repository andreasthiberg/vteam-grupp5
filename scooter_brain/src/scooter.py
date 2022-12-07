# -*- coding: UTF-8 -*-

"""Scooter simulation class"""

import requests
import json

class Scooter():
    """Class to simulate a single scooter, moving and getting/sending updates"""

    def __init__(self, id, pos):
        self.id = id
        self.pos = pos

    def send_update(self):

        # GraphQL API URL
        url = "http://backend:3000/graphql"
        
        body = """
        mutation {
            updateScooter
        }
        """
        
        response = requests.post(url=url, json={"query": body})
        print("response status code: ", response.status_code)
        print("response : ", response.content)

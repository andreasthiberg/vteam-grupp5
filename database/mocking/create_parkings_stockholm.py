APIKEY = "79259295-5f84-46d2-bcf9-6686b597883c"

import json
from urllib.request import urlopen

url = f"https://openparking.stockholm.se/LTF-Tolken/v1/servicedagar/weekday/m%C3%A5ndag?outputFormat=json&apiKey={APIKEY}"
response = urlopen(url)
data = json.load(response)["features"]
city = "Stockholm"
separator = ","
last_name = ""

with open('../sql/insert3-parking-zone.sql', 'w') as fh:
    fh.write("USE high5\n")
    fh.write("INSERT INTO parking_zone\n")
    fh.write("    ( `pos`, `city` )\n")
    fh.write("VALUES\n")

    for i, station in enumerate(data):
        name = station["properties"]["STREET_NAME"]
        if name == "<Gatunamn saknas>":
            name = station["properties"]["CITY_DISTRICT"]
        if name != last_name:
        # if station["properties"]["STREET_NAME"] != last_name:
            lat = station["geometry"]["coordinates"][0][1]
            lon = station["geometry"]["coordinates"][0][0]
            position = f"{lat},{lon}"
            if i == len(data) - 1:
                separator = ";"

            fh.write(f"      ('{position}', '{city}'){separator}\n")
        last_name = name
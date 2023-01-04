import random

city = "Stockholm"
separator = ","
last_name = ""
number_of_stations = 20
start_lat = 59.320019
end_lat = 59.340224
start_lon = 18.050951
end_lon = 18.072885

with open('../sql/insert4-charging-station.sql', 'w') as fh:
    fh.write("USE high5\n")
    fh.write("INSERT INTO charging_station\n")
    fh.write("    ( `pos`, `city` )\n")
    fh.write("VALUES\n")

    for i in range (number_of_stations):
        lat = random.uniform(start_lat, end_lat)
        lon = random.uniform(start_lon, end_lon)
        position = f"{lat},{lon}"
        if i == (number_of_stations -1):
            separator = ";"

        fh.write(f"      ('{position}', '{city}'){separator}\n")

import random

city = "Lund"
separator = ","
last_name = ""
number_of_stations = 20
start_lat = 55.706394
end_lat = 55.707225
start_lon = 13.191956
end_lon = 13.196277

with open('../sql/insert4-charging-stations-lund.sql', 'w') as fh:
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

        fh.write(f"      ('[{position}]', '{city}'){separator}\n")

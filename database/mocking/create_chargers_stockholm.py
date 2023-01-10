import random

city = "Stockholm"
separator = ","
last_name = ""
number_of_stations = 100
start_lat = 59.29111454588576
end_lat = 59.36474994324031
start_lon = 17.952050873611014
end_lon = 18.14759556339954


with open('../sql/insert4-charging-stations-stockholm.sql', 'w') as fh:
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

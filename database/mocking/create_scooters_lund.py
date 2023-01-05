import random

city = "Lund"
separator = ","
last_name = ""
number_of_bikes = 100
start_lat = 55.706394
end_lat = 55.707225
start_lon = 13.191956
end_lon = 13.196277

with open('../sql/insert2-scooters-lund.sql', 'w') as fh:
    fh.write("USE high5\n")
    fh.write("INSERT INTO scooter\n")
    fh.write("    ( `status`, `pos`, `battery`, `city` )\n")
    fh.write("VALUES\n")

    for i in range (number_of_bikes):
        lat = random.uniform(start_lat, end_lat)
        lon = random.uniform(start_lon, end_lon)
        position = f"{lat},{lon}"
        if i == (number_of_bikes -1):
            separator = ";"

        fh.write(f"      ('1', '[{position}]', '100', '{city}'){separator}\n")

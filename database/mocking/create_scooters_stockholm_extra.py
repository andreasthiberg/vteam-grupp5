import random

city = "Stockholm"
separator = ","
last_name = ""
number_of_bikes = 50
start_lat = 59.27099974329289
end_lat = 59.38191991257416
start_lon = 17.897545204953783
end_lon = 18.164118491166377


with open('../sql/insert2-scooters-stockholm-extra.sql', 'w') as fh:
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

        fh.write(f"      (5, '[{position}]', 0, '{city}'){separator}\n")


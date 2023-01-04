import random

city = "Stockholm"
separator = ","
last_name = ""
number_of_bikes = 100
start_lat = 59.320019
end_lat = 59.340224
start_lon = 18.050951
end_lon = 18.072885

# Malmö
# start_lat = 55.582297
# end_lat = 55.597578
# start_lon = 12.999528
# end_lon = 13.031001

with open('../sql/insert1-scooter.sql', 'w') as fh:
    fh.write("USE high5\n")
    fh.write("INSERT INTO scooter\n")
    fh.write("    ( `pos`, `city` )\n")
    fh.write("VALUES\n")

    for i in range (number_of_bikes):
        lat = random.uniform(start_lat, end_lat)
        lon = random.uniform(start_lon, end_lon)
        position = f"{lat},{lon}"
        if i == (number_of_bikes -1):
            separator = ";"

        fh.write(f"      ('[{position}]', '{city}'){separator}\n")

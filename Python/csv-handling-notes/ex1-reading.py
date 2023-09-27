'''


csv_reader: Object that can be modified for some csv format. It's an 
iterator, so iterate through it.

'''

import csv

with open("employee_names.csv", "r") as file:

    csv_reader = csv.reader(file)

    # Skip the first line which are the column labels
    next(csv_reader)

    for line in csv_reader:
        print(line)
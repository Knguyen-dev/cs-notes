'''
- Let's write to a csv file, where we 
    want to only write the names of the employees to the file.
    Also we want the delimiter to be dashes or '-'.

- NOTE: If a value in the csv already contains a delimiter, like maybe
    the email, then csv module puts quotes around it to indicate that it's a whole 
    value, which is its way of not messing up.
    
.writerow: Basically writes content on a new line
'''


import csv

with open("employee_names.csv", "r") as readFile:
    csv_reader = csv.reader(readFile)

    # Remove newline so that csv works correctly and doesn't output an empty row every other time
    with open("new_names.csv", "w", newline="") as writeFile:
        csv_writer = csv.writer(writeFile, delimiter="-")

        for line in csv_reader:
            csv_writer.writerow(line)



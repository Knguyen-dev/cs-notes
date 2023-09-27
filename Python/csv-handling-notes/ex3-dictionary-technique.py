'''
DictReader: Let's you work with the csv in terms of 
    dictionaries. Takes the first row "column names" and makes 
    those keys, and let's a value in the given row be the value 
    to that key.  

-  Dictionary writer makes it easy when either you don't remember what 
    index a value represented, or when other developers don't know either. 
    With the writer it's just more readable.


'''
import csv

with open("employee_names.csv", "r") as readFile:
    # Get content from csv
    csv_reader = csv.DictReader(readFile)

    with open("new_names.csv", "w", newline="") as writeFile:
        # Configure csv writer
        fieldNames = ["first_name", "last_name", "email"]
        csv_writer = csv.DictWriter(writeFile, fieldnames=fieldNames, delimiter='\t')
        
        # Write to new csv remove the key and value for the email
        # So that we only write the first and last name
        for line in csv_reader:
            del line['email']
            csv_writer.writerow(line)
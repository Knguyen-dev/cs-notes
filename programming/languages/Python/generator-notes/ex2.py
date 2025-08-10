import random
import time

names = [
	"John",
	"Lucy",
	"Corey",
	"Rick",
	"Anthony",
	"Thomas"
]

majors = [
	"Math",
	"Engineering",
	"Computer Science",
	"Arts",
	"Business"
]

# Creates a list of people size numPeople
def peopleList(numPeople):
	result = []
	for x in range(numPeople):
		person = {
			"id": x,
			"name": random.choice(names),
			"major": random.choice(majors),
		}
		result.append(person)
	return result

# Creates a generator that yields numPeople amount of people
def peopleGenerator(numPeople):
	for x in range(numPeople):
		person = {
			"id": x,
			"name": random.choice(names),
			"major": random.choice(majors),
		}
		yield person

def timeGenerator(numPeople):
	start = time.time()
	peopleGenerator(numPeople)
	end = time.time()
	print(f"Generator created in {end-start} second(s)")

def timeList(numPeople):
	start = time.time()
	peopleList(numPeople)
	end = time.time()
	print(f"List created in {end-start} second(s)")

if __name__ == "__main__":
	numPeople = 10000000

	# Generator took 0.10 seconds, whilst making a list took 10.67 seconds. 
	# Add obviously the amount of memory the generator takes is way smaller than the amount of memory for the list
	timeGenerator(numPeople)
	timeList(numPeople)


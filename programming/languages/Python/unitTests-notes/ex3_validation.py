import re

def isValidUsername(username):
	'''Accepts an alphanumeric username that is 6 to 20 characters long, accepts underscores'''	
	pattern = r'^\w{6,20}$'
	return re.match(pattern, username) is not None
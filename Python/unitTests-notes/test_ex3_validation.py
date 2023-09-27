import unittest
from ex3_validation import isValidUsername

'''
- Sometimes if you have a function you can just load values into, then doing this iterative approach of 
    checking a list of values is very effective. 
'''

class TestIsValidUsername(unittest.TestCase):
	def test_valid_usernames(self):  
		validUsernames = ["username", "uSerName" ,"Short45", "UPPERNAME", "Long_User_Name4_1289"]
		for username in validUsernames:
			with self.subTest(username=username):
				self.assertTrue(isValidUsername(username))
	
	def test_invalid_usernames(self):
		invalidUsernames = ["", "short", "$DonnaPerol", "Some-username@guy", "long-username-over-limit"]
		for username in invalidUsernames:
			with self.subTest(username=username):
				self.assertFalse(isValidUsername(username))

if __name__ == "__main__":
	unittest.main()
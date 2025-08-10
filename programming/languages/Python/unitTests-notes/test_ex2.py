import unittest
from ex2 import Employee
from unittest.mock import patch

'''
- Good, but the only issue is how we're always repeating ourselves when instantiating two 
    employee class instances. To not repeat ourselves use setUp and tearDown methods

- setUp: runs its code before every single test
- tearDown: runs its code after every single test

'''


class TestEmployee(unittest.TestCase):

    def setUp(self):
        '''Sets up the employees 1 and 2, and makes them accessible to all other test functions by taking them instance attributes'''
        self.e1 = Employee("James", "Connoway", 50000)
        self.e2 = Employee("Arthur", "Maxwell", 40000) 

    
    def tearDown(self):
        '''Maybe if your functions added files or to a directory or database, then the teardown function could clear that database'''
        pass


    def test_email(self):
        # e1 = Employee("James", "Connoway", 50000)
        # e2 = Employee("Arthur", "Maxwell", 40000)

        self.assertEqual(self.e1.email, "James.Connoway@gmail.com")
        self.assertEqual(self.e2.email, "Arthur.Maxwell@gmail.com")
        
        self.e1.first = "Jefferson"
        self.e2.first = "Saines"
        
        self.assertEqual(self.e1.email, "Jefferson.Connoway@gmail.com")
        self.assertEqual(self.e2.email, "Saines.Maxwell@gmail.com")

    def test_fullname(self):
        # e1 = Employee("James", "Connoway", 50000)
        # e2 = Employee("Arthur", "Maxwell", 40000)

        self.assertEqual(self.e1.fullName, "James Connoway")
        self.assertEqual(self.e2.fullName, "Arthur Maxwell")
        
        self.e1.first = "Jefferson"
        self.e2.first = "Saines"

        self.assertEqual(self.e1.fullName, "Jefferson Connoway")
        self.assertEqual(self.e2.fullName, "Saines Maxwell")

    def test_raise(self):
        # e1 = Employee("James", "Connoway", 50000)
        # e2 = Employee("Arthur", "Maxwell", 40000)
        
        self.e1.apply_raise()
        self.e2.apply_raise()

        self.assertEqual(self.e1.pay, 52500)
        self.assertEqual(self.e2.pay, 42000)

    def test_monthly_schedule(self):
        '''
        Patch is used as context manager, and so we mock the 'ex2' module we want to mock requests.get in the 'ex2' module.
        Now when requests.get is run, it returns mockResponse, our mock or fake response object. Remember this also relies on the 
        function that did the network request, defined in ex2.py.
        '''
        with patch("ex2.requests.get") as mockResponse:
            mockResponse.return_value.ok = True
            mockResponse.return_value.text = "Successful stuff"

            # Call our GET function and pass in args if any
            schedule = self.e1.monthly_schedule("May")

            # Now our mockResponse object should have been triggered and defined, so check what URL the request was called with
            mockResponse.assert_called_with("http://company.com/Connoway/May") 

            # Now our mocking should have replaced 'schedule' with the 'text' return value
            self.assertEqual(schedule, "Successful stuff")




if __name__ == "__main__":
    unittest.main()









        
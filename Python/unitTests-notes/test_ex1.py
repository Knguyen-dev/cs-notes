'''
1. Make a class where you're testing that one function
2. Then you make functions that test different things.

- NOTE: Here we have two tests: 'test_area' and 'test_value'. Within those tests, we have our subtests.
    Know that these functions must start with 'test_'

- assertAlmostEqual(inputted value, expected value): Checks a couple of decimal places down until it sees the return value and correct value are the same
- assertRaisesValue(expected value, callback, arguments) 
'''

import unittest
from ex1 import circle_area
from math import pi

class TestCircleArea(unittest.TestCase):
    # Runs tests to see if the calculations from the function is correct
    # NOTE: use assertAlmostEqual(input value, correct value) for decimals since 
    def test_area(self):
        self.assertAlmostEqual(circle_area(1), pi)
        self.assertAlmostEqual(circle_area(0), 0)

    # Runs tests to see if value errors come up correctly
    def test_values(self):
        self.assertRaises(ValueError, circle_area, -2)
        self.assertRaises(TypeError, circle_area, 'b')

if __name__ == "__main__":
    unittest.main()
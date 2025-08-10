'''
- A function is detected as a generator when yield is used.
    It remembers it's 'state' and knows what value to yield next.

- Two approaches to getting values from generator:
    1. Iterate over it
    2. Using next() to get the next valuve

NOTE: If you try to get the next value with next() and there isn't another value,
    it'll raise an error.
'''

def squareNums(nums):
    for n in nums:
        yield n * n

myNums = squareNums([1,2,3,4,5])

myNums2 = squareNums([1,2,3,4,5])

for n in myNums:
    print(n)
# First generator is now exhausted

next(myNums2)
next(myNums2)
next(myNums2)
next(myNums2)
next(myNums2)
# Second generator is now exhausted
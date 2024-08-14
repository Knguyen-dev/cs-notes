#!/usr/bin/bash

# List of names
names=("Kevin" "David" "Zaid" "James" "Jason" "Anthony" "Aaron")

# 1. iterating over a list of items
for name in "${names[@]}"; do
  echo "Name: $name"
done

# 2. iterating over a sequence of numbers
for i in {1..5}; do
  echo "Number: $i"
done

# 3. Using c-like syntax in your for loop
for ((i = 0; i < 5; i++)); do 
  echo "N: $i"
done

# 4. While loop; so while count <= 5
count=1
while [ $count -le 5 ]
do
    echo "Count: $count"
    count=$((count + 1))
done

# 5. until loop; continue to iterate until count is greater than 5
count=1 
until [ $count -gt 5 ]; do
  echo "Count: $count"
  ((count++)) # increment count
done


# 6. Using continue to skip printing out 'james'
for name in "${names[@]}"; do
  if [ "$name" == "James" ]; then
    continue
  fi
  echo "Name: $name"
done

# 7. Using 'break' to stop the loop when it sees '6'
for i in {1..10}; do
  if [ $i -eq 6 ]; then
    break
  fi
  echo "Number: $i"
done

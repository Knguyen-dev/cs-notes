#!/usr/bin/bash

# 1. General arithmetic operations
read -p "Enter n1: " n1
read -p "Enter n2: " n2

sum=$((n1+n2))
difference=$((n1-n2))
product=$((n1*n2))
quotient=$((n1/n2))
remainder=$((n1%n2))

echo "Sum: $sum"
echo "Difference: $difference"
echo "Product: $product"
echo "Quotient: $quotient"
echo "Remainder: $remainder"
echo "Increment of n1: $((n1+1))"

# 2.  Early look at conditionals
if [ $n1 -gt $n2 ]; then
  echo "$n1 is greater than $n2"
elif [ $n1 -lt $n2 ]; then
  echo "$n1 is less than $n2"
else
  echo "$n1 is equal to $n2"
fi


# 3. Arithmetic comparison and evaluations:
# Use (( )) when evaluating an arithmetic operation or comparison
# comparison operators: >, >=, <, <=, ==, !=
# no need to use '$' when referencing variables inside (( ))
count=5
((count++))
echo $count # outputs 6
if (( count > 5 )); then
  echo "Count is greater than 5"
fi

# 4. String comparisons with '==' inside '[]' or '[[]]'. The double square brackets support 
# pattern matching with '=='. However single brackets is more traditional and portable.
# Using [[ ]]
str1="hello"
str2="world"
if [[ $str1 == "hello" ]]; then
  echo "str1 is hello"
fi

# Using [ ]
if [ "$str2" = "world" ]; then
  echo "str2 is world"
fi

# 5. Numeric comparisons with '-eq' '-lt', '-le', '-gt', '-ge', and '-ne' inside '[]'
n1=10
n2=20
if [ $n1 -lt $n2 ]; then
  echo "$n1 is less than $n2"
fi

if [ $n1 -eq 10 ]; then
  echo "$n1 is equal to 10"
fi

# Summary:
# 1. Use (()) for arithmetic operations and comparisons ((a > b))
# 2. Use [[]] for string comparisons and advanced patter nmatching [[ $str == "value" ]]
# 3. Use [] for simple string comparisons and numeric comparisons 





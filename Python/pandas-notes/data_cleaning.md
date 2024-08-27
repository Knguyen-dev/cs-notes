# Data Cleaning

## What is data cleaning?
It's the idea of correcting or removing inconsistent or invalid data. Bad data leads to bad predictions and analyses, so preventing this allows us to do better statistics.

## Data Quality

### Validity
Does the data confirm to our business rules/constraints?
- Data-Type Constraint: Values of a particular column must be of a particular data type. Like a username should be a string.
- Range constraint: Numbers and dates should fall within a certain range.
- Mandatory constraints: Certain columns can't be empty.
- Unique Constraints: A field or a combination of fields must be unique across a dataset. 
- Set-Membership constraints: Value of a column must belong to a set of discrete values (e.g. enums). For example, a person's gender should be male or female.
- Foreign-key constraints: If the foreign key is defined, it should reference an existing row in another table.
- Regex patterns: For certain fields, they must conform to a regex pattern such as the 'phone number' or 'credit card' fields having to match their respective patterns.
- Cross-field validation: Certain conditions that span across multiple fields must be respected. For example, a patient's date of discharge can't be earlier than the date of admission.

### Accuracy
The degree to which data is close to the true values. When querying for 'eye color', there's not really a valid or invalid eye color (assuming real colors). The idea here is we want what's closest to the truth or reality. Is that person's eye color actually 'blue'? Things like that.

### Completeness
The degree to which all required data is known. Missing data is going to happen a lot.

### Consistency
The degree to which data is consistent, within the same dataset or across multiple data sets. 

Inconsistency happens when two values in a dataset contradict each other. A valid age could be 10, but marital status could be 'divorce'd, which doesn't seem to make sense.

### Uniformity
How The degree to which data is specified using the same unit of measure. Weight could be in pounds or kilos, dates in the USA or European format, and currency in USD or YEN. 

Ensure that the data all uses the same region or unit of measurement.

## Workflow
A general solution or step to working with data
1. Inspect: See any errors and inconsistent data.
  - Get summary statistics.
  - Visualize data.
2. Clean: Fix or remove errors.
  - Irrelevant Data: If we're analyzing data about health and cancer, then we probably don't need a person's phone number. If we were only interested in a particular country, we wouldn't include data from other countries.
  - Type conversions: Numbers should be numbers. Watch out for missing values.
  - typos: Fix typos in the data. Trim the whitespace, etc.
  - Normalize and graph
3. Verify: After cleaning, see if things are good.
4. Report: Report the changes made and evaluate the quality of data.

## Handling missing values
Ignoring missing data completely isn't always the best idea.

- Dropping: If missing values in a given column rare, then look at the rows that have the missing values. If most of the column is missing and this happens randomly, just drop the column.
- Deriving: You can guesstimate the missing value based on other observations. Maybe use a random value to fill it in with.
- Copy: Copying values from other similar records. Usually this isn't recommended, unless you have a lot of data.
- Ignore row with missing value: You can argue that trying to fill in the missing value leads to a loss in information regardless.

# Credits:
1. [Data cleaning article](https://towardsdatascience.com/the-ultimate-guide-to-data-cleaning-3969843991d4)
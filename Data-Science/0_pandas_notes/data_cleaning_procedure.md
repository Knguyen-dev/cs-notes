
## Missing data

### Step 1: Assess amount of missing data
```
<!-- Gets the number of missing data points per column; series -->
missing_value_count = df.isnull().sum()

<!-- Looks at the number of missing data points for your first 10 columns -->
missing_value_count[0:10]

<!-- Overall, get the ratio of data that's missing -->
total_cells = np.product(df.shape)
total_missing = missing_value_count.sum()
percent_missing = (total_missing/total_cells)
```

### Step 2: Why is data missing and is it important?
We need to figure out why our data is missing. Ask yourself: "Is this value missing because it wasn't recorded, or because it doesn't exist?". 

For example, the height of the oldest child for someone who doesn't have children. Here the data just doesn't exist, so that at least makes sense so we can leave it empty or substitute it with a human-readable value. But in a case where we think a value wasn't recorded, we can guesstimate the value based on the values of other fields (aka imputation). 

A good tip is to read the dataset documentation. For a basketball game the 'gameResult' column being empty is pretty suspicious, every game has a result. But if the 'numFouls' is empty, that could make sense if no fouls happened in the game. 


### Method 1: Dropping missing values
When we're in a hurry and don't care about why the values are missing, then remove any rows or columns that contain missing values. This is generally not recommended for more important projects since we are throwing away information, and it's generally a good idea to take it slow and analyze things. 

```
<!-- Remove all rows that contain a missing value -->
df.dropna()

<!-- Remove all columns with at least 1 missing value -->
columns_with_na_dropped = df.dropna(axis=1)

<!-- Compare to see the number of columns we lost -->
print("Columns in original dataset: %d \n" % nfl_data.shape[1])

print("Columns with na's dropped: %d" % columns_with_na_dropped.shape[1])
```
In the former, there's a chance that dropping all rows with a missing value could drop all of your data, assuming all of your rows has at least one missing value. So in that case, it may be best to drop any columns that have missing values. At least this way you may be able to salvage some data.

### Method 2: Filling missing values 
The recommended way of handling things. Let's get a section of data rather than the whole thing. We'll assume that from EPA to Season, all of these columns are numerical. Since that's the case, it may be appropriate to fill the missing values with '0' instead.
```
subset_data = data.loc[:, "EPA": "Season"];
subset_data.fillna(0)
```
You could be a little clever and replace the missing value with the value that comes after it in the same column.

- `bfill`: Backfill will fill missing values with the next non-missing value in, i.e. the value below in the same column. If the next value was also missing, then the current one will stay NaN. The second fillna runs after 'bfill' and takes care of replacing any remaining NaN values with 0.
```
subset_data.fillna(method="bfill", axis=0).fillna(0)
```

Extra note, but let's say you had missing values in a 'ZipCode' column? Of course you can fill in those values, but here you actually have some kind of chance to correct this data. Ideally you could try to use another dataset, with the right ZipCodes filled in, in order to fix your data! 

## Scaling and Normalization

### Scaling
Idea of modifying the range of your data when graphing and showing it. Such as 0 to 100 for the y axis. 

For example, we could be looking at prices of the same product in Yen and USD. 1 USD is 100 Yen, they aren't one-to-one. This can spell trouble for statistical algorithms that place the change of 1 dollar the same as the change of 1 yen, when updating parameters. Here the idea is to convert the currencies. However what about height and weight? How many pounds should equal one 1 inch? 

Scaling the variables can help us in the simple problems, and also the tougher ones.


- Normalization: Changing the shape of the distribution of our data so that it roughly resembles a normal distribution.



# Credits:
1. [Data Cleaning Tutorial - Kaggle](https://www.kaggle.com/learn/data-cleaning)
2. 
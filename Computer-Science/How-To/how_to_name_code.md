# How to name things in code

## Avoid abbreviations and single letters
Avoid abbreviations or naming things with one letter. We want to be able to tell the purpose of a function or variable. By abbreviating your code, it assumes you have some context in understand the abbreviation. As well as this, abbreviations are common with systems and projects having their own naming patterns and schemes. Making it a lot harder to transition to a new project. Remember that reading code is what you're going to spend the most time doing.
```
<!-- Bad: Single letters -->
public static parseCookie(n: string): string | null {
  const s = `; ${document.cookie}`.split(';');
  for (let c of s) {
    if (c.indexOf(n) === 0) {
      return c.substring(c.length+1)
    }
  }
  return null
}

<!-- Good: I better understand what's going on -->
public static parseCookie(name: string): string | null {
  const cookieStrings = `; ${document.cookie}`.split(';');
  for (let cookieString of cookieStrings) {
    if (cookieString.indexOf(n) === 0) {
      return cookieString.substring(cookieString.length+1)
    }
  }
  return null
}
```
Here's how it looks with abbreviations. The only reason abbreviations were ever used in the first place was due to narrow monitor screens and also to save on typing. Now we have wider than 80 character screens and auto-complete is a widely supported technology for programming and general work.
```
<!-- Bad: What's the purpose? What is it doing? -->
def comp_stats(d, m, sd, n):
    u = m + (1.96 * sd / (n ** 0.5))
    l = m - (1.96 * sd / (n ** 0.5))
    s = sum((x - m) ** 2 for x in d) / len(d)
    v = s / n    
    return {
        'upper': u,
        'lower': l,
        'variance': v
    }

<!-- Good: I understand the purpose of the function now -->
def calculate_confidence_interval_and_variance(data, mean, standard_deviation, sample_size):
    upper_bound = mean + (1.96 * standard_deviation / (sample_size ** 0.5))
    lower_bound = mean - (1.96 * standard_deviation / (sample_size ** 0.5))
    squared_differences = sum((value - mean) ** 2 for value in data) / len(data)
    variance = squared_differences / sample_size
    return {
        'confidence_interval_upper_bound': upper_bound,
        'confidence_interval_lower_bound': lower_bound,
        'variance': variance
    }
```


## Avoid adding types in the name
In older code, some of it is in 'Hungarian Notation', which is when we prefix the type of the variable onto its name. This was likely when before we had good types in C, as everything used to be represented as data type 'int' or char. In the modern era, statically typed languages let us define many different types to variables, and now the need for Hungarian notation is no more. It's less verbose and doesn't clutter up our code as much.
```
<!-- Bad -->
bool bIsValid;
int32_t iSpeed;
uint32_t uNumUsers;
char* szUserName;

<!-- Good -->
bool isValid;
int32_t speed;
uint32_t numUsers;
char* userName;
```
Also for an interface, you shouldn't need to prefix 'I' in front of it. Also you don't need to put 'Base' or 'Abstract' on your classes.
```

<!-- Bad: If you're having trouble with the parent name, then maybe it's a sign to change the child name -->
class Truck : BaseTruck {
  ...
}

<!-- Good: You want a specific thing, you get a specific name for said thing.  -->
class TrailerTruck : Truck {
  ...
}
```

## Put units in variable names
Makes it clear to a developer, what unit we're working with. 
```
<!-- Bad -->
void execute(int delay) {...}

<!-- Better, at least we know the units -->
void execute(int delaySeconds) {...}
```

## Avoid having a 'utils' class
If you find yourself with a class or file with 'Utils', then it's probably a good sign for refactoring. The `getMovieImages()` function probably isn't a utils function, but could belong in the `Movies` class, or somewhere near where all of the movies code is.
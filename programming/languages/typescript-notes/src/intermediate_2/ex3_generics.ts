/*
- Generics: A way to create reusable components. Essentially the 
template <T> and template functions that was in C++. For example let's 

*/

// A function that receives an array typed any and returns an array of type any
function getArray(items: any[]): any[] {
	return new Array().concat(items);
}

/*
- Now I can still do numArr.push("somestring") because in the end 
    we are getting back an array typed any.
*/
const numArr = getArray([1, 2, 3, 4]);
const strArr = getArray(["a", "b", "c"]);

/*
- Ex. 2: Now let's say we wanted to be able to choose what 
    type of array was returned. We use type 'T' which is a 
    template. T can be 'number', string, or anything now.
    So we get an array of items typed T, and we return an array
    of items type T. 
1. Use the generic as a placeholder for the type when making the 
    function definition
2. Then define the type you want to use when calling the function
3. As a result, you aren't forced to create two of the same 
    function and repeat yourself in your code. 
*/
function getArray<T>(items: T[]): T[] {
	return new Array().concat(items);
}
let numArr2 = getArray<number>([1, 2, 3, 4]);
let strArr2 = getArray<string>(["a", "b", "c"]);

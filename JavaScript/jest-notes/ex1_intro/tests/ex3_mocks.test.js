/*
- Ex. 1: Here's a simple mock function. Really it's just a function
  that returns the input plus 42. Notice how we can control the 
  output of a jest.fn() here.

+ Matchers
- toHaveBeenCalledWith(a): Checks whether mock function was called 
  with the given arguments.
*/
test("Mock implementation of a basic function", () => {
	const mock = jest.fn((x) => 42 + x);
	expect(mock(1)).toBe(43);

	// Check that our mock function was called with argument '1'.
	expect(mock).toHaveBeenCalledWith(1);
});

/*
- Ex. 2: Let's say we have a 'video' object with a method play(). We 
  can 'spy' on or get the data of said methods. As a result, we can 
  know if the method has been called, what arguments, etc. 

*/
test("spying on a method of an object", () => {
	const video = {
		play() {
			return true;
		},
	};

	/*
  - Create a spy the 'play' method on the video object. Now jest will
    replace the spy function with a mock function. This allows us to track
    extra information about the method being called 'play'.
  */

	const spy = jest.spyOn(video, "play");

	// Call method
	video.play();

	// Check that the 'play' method was called on the video object.
	expect(spy).toHaveBeenCalled();

	/*
  - Used to restore the original implementation of the 'play' method
    after we're doing 
  
  */
	spy.mockRestore();
});

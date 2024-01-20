/*
+ Review on creating modules: To make objects available outside a module
  you need to expose them as additonal properties of the 'exports' object.
  Below our .js file is exporting two functions, area() and perimeter().



*/

// Export by building single properties as a time
// exports.area = function (width) {
// 	return width * width;
// };

// exports.perimeter = function (width) {
// 	return 4 * width;
// };

// Better way: Export as one object
module.exports = {
	area(width) {
		return width * width;
	},
	perimeter(width) {
		return 4 * width;
	},
};

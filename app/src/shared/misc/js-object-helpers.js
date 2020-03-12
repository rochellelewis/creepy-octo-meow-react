/*
* Custom utility functions to replace lodash in this project.
* Rinse and Repeat!
*
* Author: rlewis37@cnm.edu
* */

/*
* Checks for an empty object.
*
* return false if object is not empty. Return true is object is empty.
* Replaces lodash _.isEmpty function.
* See: https://lodash.com/docs/4.17.15#isEmpty
* */
export const isEmpty = (o) => {
	for(const key in o) {
		if(o.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
};
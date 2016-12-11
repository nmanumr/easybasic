# Variables

Variable names must start with a letter; all characters of the variable name (except the sigil) must be letters `A—Z`, figures `0—9`, or a dot `.` Only the first 40 characters in the name are significant. A variable name must not be identical to a reserved word or a reserved word plus sigil. Therefore, for example, you cannot name a variable `TO!` but you can name it `AS!`. Variable names may contain any reserved word. Variable names may also start with a reserved word, with the exception of `USR` and `FN`. Thus, `FNORD%` and `USRNME$` are not legal variable names while `FRECKLE%` and `LUSR$` are.

For each name, four different variables may exist corresponding to the four types. That is, you can have `A$`, `A%`, `A!` and `A#` as different variables. Which one of those is also known as `A` depends on the settings in `DEFINT`/`DEFDBL`/`DEFSNG`/`DEFSTR`. By default, `A` equals the single-precision `A!`.

Furthermore, the arrays `A$()`, `A%()`, `A!()`, `A#()` are separate from the scalar variables of the same name.

## Types and sigils
PC-BASIC recognises four variable types, distinguished by their *sigil* or *type* character, the last character of the variable's full name:

| sigil | type | size | range | precision |
|:--:|:---:|:---:|:---:|:---:|
| $ | string | 3 bytes plus allocated string space | 0—255 characters |- |	
| % | integer | 2 bytes | -32768—32767 | exact |
| ! | single-precision float |	 4 bytes |±2.938726·10-39—±1.701412·1038 | ~6 significant figures |
| # |double-precision float | 8 bytes | ±2.938735877055719·10-39—±1.701411834604692·1038 |	~16 significant figures |

Note that double-precision floats can hold more decimals than single-precision floats, but not larger or smaller numbers.

While all integers are signed, some statements will interpret negative integers as their two's complement.

## Arrays
Arrays are indexed with round or square brackets; even mixing brackets is allowed. The following are all legal array elements: `A[0]`, `A(0)`, `A(0]`, `A[0)`. Multidimensional arrays are specified by separating the indices with commas: `A(0, 0)`, `A[0, 0, 0]`, etc.

By default, arrays are indexed from `0`. This can be changed to `1` using `OPTION BASE 1`.

Arrays can be allocated by specifying the largest allowed index using `DIM`. If all indices of the array are `10` or less, they need not be explicitly allocated. The first access of the array (read or write) will automatically allocate it with a maximum index of `10` and the same number of indices as in the first access. To re-allocate an array, the old array must first be deleted with `CLEAR` or `ERASE`.

## Conversions
PC-BASIC will implicitly convert between the three numerical data types. When a value of one type is assigned to a variable, array element or parameter of another type, it is converted according to the following rules:

* Single- and double-precision floats are converted to integer by rounding to the nearest whole number. Halves are rounded away from zero. If the resulting whole number is outside the allowed range for integers, `Overflow` is raised.

* Double-precision floats are converted to single-precision floats by Gaussian rounding of the mantissa, where the new least significant bit of the mantissa is rounded up if the clipped-off binary fraction is greater than one-half; halves are rounded to even.

* Integers are converted to their exact representation as single- or double-precision floats.

* Single-precision floats are converted to their exact representation as double-precision floats.

* There is no implicit conversion between strings and any of the numeric types. Attempting to assign a string value to a numeric variable, array element or parameter (or vice versa) will raise `Type mismatch`.
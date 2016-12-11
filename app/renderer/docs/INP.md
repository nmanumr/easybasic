# INP
```
code = INP(port)
```
Returns the value of an emulated machine port. 

## Parameters
port is a numeric expression in `[0—65535]`.

| port | **Effect** |
|------| -----------|
| &h60 | Returns the keyboard scancode for the current key pressed or the last key released. The scancodes returned by INP(&h60) are those listed in the keyboard scancodes table. If a key is currently down, the return value is its scancode. If no key is down, the return value is the scancode of the last key released, incremented by 128.|
| h201 | Returns the value of the game port (joystick port). This value is constructed below.<table><thead><tr><th>Bit</th><th>Meaning</th></tr></thead><tbody><tr><td>0</td><td>joystick 2 x-axis</td></tr><tr><td>1</td><td>joystick 1 y-axis</td></tr><tr><td>2</td><td>joystick 1 x-axis</td></tr><tr><td>3</td><td>joystick 2 y-axis</td></tr><tr><td>4</td><td>joystick 2 button 1</td></tr><tr><td>5</td><td>joystick 1 button 2</td></tr><tr><td>6</td><td>joystick 1 button 1</td></tr><tr><td>7</td><td>joystick 2 button 2</td></tr></tbody></table>The button bits are 0 when the button is fired, 1 otherwise. The axis values are normally 0 but are set to 1 by OUT &h201, x and then fall back to 0 after a delay. The longer the delay, the higher the axis value.|
| other values | Returns zero.|

## Notes
Only a limited number of machine ports are emulated in PC-BASIC.
## Errors
* port is not in `[-32768—65535]`: `Overflow`.
* port has a string value: `Type mismatch`.
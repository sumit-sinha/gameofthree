# Game of Three

### Goal

The Goal is to implement a game with two independent units - the players - communicating with each other using an API.

### Description

When a player starts, it incepts a random (whole) number and sends it to the second player as an approach of starting the game.

The receiving player can now always choose between adding one of {­1, 0, 1} to get to a number that is divisible by 3. Divide it by three. The resulting whole number is then sent back to the original sender.

The same rules are applied until one player reaches the number 1 (after the division).

[![N|Solid](http://52.35.208.145/images/game.png)](http://52.35.208.145/)

### Working Demo

A working demo of this application is hosted at http://52.35.208.145/

### Development

To start this application open a command window (or terminal for mac) at root folder and run **npm run start**

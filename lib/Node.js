export default class Node {
  constructor(letter = null) {
    this.children = {};
    this.wordEnd = false;
    this.letter = letter;
    this.frequency = 0;
  }
}
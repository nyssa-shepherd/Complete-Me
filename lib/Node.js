export default class Node {
  constructor(value = null) {
    this.children = {};
    this.wordEnd = false;
    this.value = value;
  }
}
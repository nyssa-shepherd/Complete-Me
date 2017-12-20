import Node from './Node';

export default class Trie extends Node {
  constructor(length = 0) {
    super(null);
    this.length = length;
    this.root = new Node();
  }

  insert(word) {
    word = word.toLowerCase().split('');
    
    let currNode = this.root;
  
    word.forEach(value => {
      if (!currNode.children[value]) {
        currNode.children[value] = new Node(value);
      } 
        currNode = currNode.children[value];   
    });

    if(!currNode.wordEnd) {
      this.length++;
    }

    currNode.wordEnd = true;
  }

  suggest(string) {
    string = string.toLowerCase().split('');
    let currNode = this.root;

    string.forEach(value => {
      if (currNode === undefined) {
        return [];
      } else {
        currNode = currNode.children[value]
      }
    });

      return this.findSuggests(currNode, string.join('')); 
  }

  findSuggests(currNode, string, suggests = []) {
    let childrenLetters = Object.keys(currNode.children);

    childrenLetters.forEach( childLetter => {
      let letterNode = currNode.children[childLetter];
      let newString = string + childLetter;

      if (letterNode.wordEnd) {
        suggests.push(
          {word: newString}
        );
      }
      return this.findSuggests(letterNode, newString, suggests);
    });

    return suggests.map(newWord => {
      return newWord.word;
    });
  }

  count() {

  }

  populate(dictionary) {
   
  }

  delete() {

  }

}

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
    let childrenValues = Object.keys(currNode.children);

    childrenValues.forEach( childValue => {
      let letterNode = currNode.children[childValue];
      let newString = string + childValue;

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

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    });
  }

  delete() {

  }

}

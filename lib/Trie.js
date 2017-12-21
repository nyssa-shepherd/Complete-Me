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
  
    word.forEach(letter => {
      if (!currNode.children[letter]) {
        currNode.children[letter] = new Node(letter);
      } 

      currNode = currNode.children[letter];  

    });

    if (!currNode.wordEnd) {
      this.length++;
      currNode.wordEnd = true;
    }
  }

  suggest(string) {
    string = string.toLowerCase().split('');
    let currNode = this.root;

    string.forEach(letter => {
      if (currNode === undefined) {
        return [];
      } else {
        currNode = currNode.children[letter];
      }
    });

    return this.findSuggests(currNode, string.join('')); 
  }

  findSuggests(currNode, string, suggests = []) {
    let childrenletters = Object.keys(currNode.children);

    childrenletters.forEach( childLetter => {
      let newString = string + childLetter;
      let currChildren = currNode.children;

      if (currChildren[childLetter].wordEnd) {
        suggests.push({word: newString, count: currChildren[childLetter].frequency});
      }

      this.findSuggests(currChildren[childLetter], newString, suggests);
    });

    let sorted = suggests.sort((a, b) => b.count - a.count)
    return sorted.map(newWord => newWord.word);
  }

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let currNode = this.root;

    word = word.split('');

    word.forEach( letter => {
      currNode = currNode.children[letter];
    });

    currNode.frequency++;
  }

  delete(word) {
    let currNode = this.root;

    word = word.split('');

    word.forEach( letter => {
      currNode = currNode.children[letter];

    });

    if (currNode.wordEnd) {
      currNode.wordEnd = null;
      this.length--;
    }
  }

}

import { expect } from 'chai';
import Node from '../lib/Node'
import Trie from '../lib/Trie'


describe('TRIE', () => {
  let trie;
  let node;

  const fs = require('fs');
  const text = "/usr/share/dict/words";
  const dictionary = fs.readFileSync(text).toString().trim().split('\n');

  beforeEach(() => {
    trie = new Trie();
    node = new Node('');
  });

  it('should be a function', function() {
    expect(Trie).to.be.a('function');
  });

  it('should have a default length starting at zero', function() {
    expect(trie.length).to.equal(0);
  });

  describe('INSERT', () => {

    it('should have length increase when a word is inserted', function() {
      expect(trie.length).to.equal(0);
      trie.insert('ant');
      expect(trie.length).to.equal(1);
    });

    it('Should have a child of n from a', () => {
      trie.insert('ant');
      expect(trie.root.children['a'].children.hasOwnProperty('n')).to.equal(true);
    });

    it('Should have a child of t from n', () => {
      trie.insert('ant');
      expect(trie.root.children['a'].children['n'].children['t'].wordEnd).to.equal(true);
    });

  });

  describe('SUGGEST', () => {

    it('Should suggest words that have been inserted', () => {
      trie.insert('ant');
      expect(trie.suggest('an')).to.deep.equal(['ant']);
    });

    it('Should suggest multiple words that have been inserted', () => {
      trie.insert('ant');
      trie.insert('anti');
      expect(trie.suggest('an')).to.deep.equal(['ant', 'anti']);
    });

    it('Should not suggest words that do not partially match the inserted phrase', () => {
      trie.insert('ant');
      trie.insert('hello');
      trie.insert('help');
      expect(trie.suggest('hel')).to.deep.equal(['hello', 'help']);
    });

    it('Should suggest all inserted words on an empty string', () => {
      trie.insert('ant');
      trie.insert('anti');
      trie.insert('hello');
      trie.insert('help');
      expect(trie.suggest('')).to.deep.equal(['ant', 'anti', 'hello', 'help']);
    });
  });

  describe('POPULATE', () => {
    
    it('Should populate with words from dictionary', () => {
      trie.populate(dictionary);
      expect(trie.length).to.equal(234371);
    });

    it('Should suggest words from the dictionary', () => {
      trie.populate(dictionary);
      expect(trie.suggest('anthec')).to.deep.equal(['anthecological', 'anthecologist', 'anthecology' ]);
    })

  });

  describe('SELECT',() => {

    it('Should add a selected word to trie.suggestions array', () => {
      trie.insert('ant');
      trie.select('ant');
      expect(trie.suggest('an')).to.deep.equal(['ant']);
    });

    it('Should have new selected words start with a frequency value of 1', () => {
      trie.insert('ant');
      trie.select('ant');
      expect(trie.root.children['a'].children['n'].children['t'].frequency).to.equal(1);
    });

    it('Should have the selection value increase if a word is selected multiple times', () => {
      trie.insert('ant');
      trie.select('ant');
      expect(trie.root.children['a'].children['n'].children['t'].frequency).to.equal(1);

      trie.select('ant');
      expect(trie.root.children['a'].children['n'].children['t'].frequency).to.equal(2);

      trie.select('ant');
      expect(trie.root.children['a'].children['n'].children['t'].frequency).to.equal(3);
    });

    it('Should be able to hold more than one word', () => {
      trie.insert('ant');
      trie.select('ant');
      expect(trie.root.children['a'].children['n'].children['t'].frequency).to.equal(1);

      trie.insert('apple');
      trie.select('apple');
      expect(trie.root.children['a'].children['p'].children['p'].children['l'].children['e'].frequency).to.deep.equal(1);

      expect(trie.suggest('')).to.deep.equal(['ant', 'apple']);
    });

    it('should put the word to the front of the array', () => {
      trie.insert('apple')
      trie.insert('ant');
      trie.select('ant');
      expect(trie.suggest('a')).to.deep.equal(['ant', 'apple']);
    });
});

  describe('DELETE', () => {

    it('should decrease the length by one after deleting an item', () => {
      trie.insert('ant');
      expect(trie.length).to.equal(1);
      trie.delete('ant');
      expect(trie.length).to.equal(0);
    });

    it('should not suggest words that have been deleted', () => {
      trie.insert('ant');
      expect(trie.suggest('an')).to.deep.equal(['ant']);
      trie.delete('ant');
      expect(trie.root.children['a'].children['n'].children['t'].wordEnd).to.equal(null);
    })

    it('should not suggest words that have been deleted', () => {
      trie.insert('anti');
      trie.insert('anthem');
      trie.insert('stuff');
      trie.delete('anthem');
      expect(trie.suggest('ant')).to.deep.equal(['anti'])
    })

  })

});

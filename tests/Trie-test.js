import { expect } from 'chai';
import Node from '../lib/Node'
import Trie from '../lib/Trie'

describe('TRIE', () => {
  let trie;
  let node;

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
      trie.insert('hell');
      trie.insert('help');
      expect(trie.suggest('hel')).to.deep.equal(['hell', 'help']);
    });

    it('Should suggest all inserted words on an empty string', () => {
      trie.insert('ant');
      trie.insert('anti');
      trie.insert('hell');
      trie.insert('help');
      expect(trie.suggest('')).to.deep.equal(['ant', 'anti', 'hell', 'help']);
    });
  });

  describe('COUNT', () => {

  });

  describe('POPULATE', () => {
    it('Should populate with words from dictionary', () => {
      trie.populate(dictionary);
      expect(trie.count).to.equal(235886);
    });

    it('Should suggest words from the dictionary', () => {
      trie.populate(dictionary);
      expect(trie.suggest('piz')).to.deep.equal([ 'pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ]);
    })

    it('Should suggest populated words', () => {
      trie.populate(['ape', 'apple', 'ascot']);
      expect(trie.count).to.equal(3);
      expect(trie.suggest('a')).to.deep.equal(['ape', 'apple', 'ascot']);
    });
  });

  describe('DELETE', () => {

  });

});

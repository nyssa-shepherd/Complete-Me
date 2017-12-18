import { expect } from 'chai';
import Node from '../lib/Node'
import Trie from '../lib/Trie'

describe('TRIE', () => {
  let trie;
  let node;

  beforeEach(() => {
    trie = new Trie();
    node = new Node();
  });

  it('should be a function', function() {
    expect(Trie).to.be.a('function');
  });

  it('should take a node as a root property', function() {
    expect(trie.root).to.deep.equal(node);
  });

  it('should have a default length starting at zero', function() {
    expect(trie.count).to.equal(0);
  });

  describe('INSERT', () => {

    it('should have an empty string as starting root', function() {

    });

    it('should have length increase when a word is inserted', function() {

    });

    it('should change letters to lowercase', function() {

    });

  });

  describe('SUGGEST', () => {

    it('should return a new array', function() {

    });

    it('should suggest words that have been inserted', function() {

    });

  });

  describe('COUNT', () => {

  });

  describe('POPULATE', () => {

  });

  describe('DELETE', () => {

  });

});

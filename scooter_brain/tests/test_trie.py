#!/usr/bin/env python3
##BARA EXEMPEL FRÅN TIDIGARE KURS - INTE VTEAM!!!
""" Module for sort functions for the class Trie """

import unittest
from src.exceptions import SearchMiss
from src.trie import Trie

class TestUnorderdList(unittest.TestCase):
    """ Submodule for unittests, derives from unittest.TestCase """

    def test_creating_new_trie(self):
        """Tests creating a new, empty Trie object"""
        new_trie = Trie()
        trie_dict = new_trie.get_word_dict()
        self.assertEqual(trie_dict,{})

    def test_insert_word(self):
        """Tests adding a new word to a Trie"""
        new_trie = Trie()
        new_trie.insert_word("hejsan",10)
        self.assertTrue("hejsan" in new_trie)

    def test_remove_only_word(self):
        """Tests removing the last word from a Trie"""
        new_trie = Trie()
        new_trie.insert_word("hejsan",10)
        new_trie.remove_word("hejsan")
        with self.assertRaises(SearchMiss) as _:
            _ = "hejsan" in new_trie

    def test_missing_word_exception(self):
        """Tests if looking for an invalid word throws a SearchMiss exception"""
        new_trie = Trie()
        with self.assertRaises(SearchMiss) as _:
            _ = "hejsan" in new_trie

    def test_removing_word(self):
        """Tests removing a word from a Trie with multiple words"""
        new_trie = Trie()
        words = ["one","two","three","four","five","six","sixes"]
        for word in words:
            new_trie.insert_word(word,1)
        new_trie.remove_word("two")
        with self.assertRaises(SearchMiss) as _:
            _ = "two" in new_trie

    def test_removing_invalid_word(self):
        """Tests removing a word which isn't in the Trie"""
        new_trie = Trie()
        words = ["one","two","three"]
        for word in words:
            new_trie.insert_word(word,1)
        with self.assertRaises(SearchMiss) as _:
            new_trie.remove_word("four")

    def test_retrieving_dict(self):
        """Tests getting a dictionary of the words and frequencies in the Trie"""
        new_trie = Trie()
        words = ["one","two","three"]
        i = 1
        for word in words:
            new_trie.insert_word(word,i)
            i += 1
        trie_dict = new_trie.get_word_dict()
        self.assertDictEqual(trie_dict,{"one":1,"two":2,"three":3})

    def test_prefix_search(self):
        """Tests if the prefix search method returns a correct dictionary."""
        new_trie = Trie()
        words = ["apple","orange","red","blue","redacted"]
        for word in words:
            new_trie.insert_word(word,1)
        prefix_search_dict = new_trie.prefix_search("re")
        self.assertDictEqual(prefix_search_dict,{"red":1,"redacted":1})

    def test_dunder_contain_methods(self):
        """Tests if the magical contains method works for Trie"""
        new_trie = Trie()
        new_trie.insert_word("hejsan",10)
        self.assertTrue("hejsan" in new_trie)

    def test_merge_sort(self):
        """Tests using merge sort method on an unsorted list"""
        new_trie = Trie()
        unsorted_list = ["apple","citrus","banana","orange","dolphin"]
        new_trie.merge_sort(unsorted_list)
        self.assertEqual(unsorted_list,["apple","banana","citrus","dolphin","orange"])

    def test_merge_sort_empty(self):
        """Tests using merge sort method on an empty list"""
        new_trie = Trie()
        empty_list = []
        new_trie.merge_sort(empty_list)
        self.assertEqual(empty_list,[])

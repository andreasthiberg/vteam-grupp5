#!/usr/bin/env python3
##BARA EXEMPEL FRÅN TIDIGARE KURS - INTE VTEAM!!!
""" Module for sort functions for the class Trie """

import unittest
from src.node import Node

class TestUnorderdList(unittest.TestCase):
    """ Submodule for unittests, derives from unittest.TestCase """

    def test_creating_new_node_without_arguments(self):
        """Tests creating a new Node object without argumnents"""
        new_node = Node()
        self.assertIsInstance(new_node,Node)

    def test_creating_new_node_with_arguments(self):
        """Tests creating a new Node object with argumnents"""
        parent_node = Node()
        new_node = Node("A",parent_node,10)
        self.assertIsInstance(new_node,Node)
        self.assertEqual(new_node.parent_node,parent_node)

    def tests_has_children_method(self):
        """Tests the has_children method of a Node object"""
        node_with_children = Node("A")
        node_without_children = Node("B")
        node_with_children.children["B"] = node_without_children
        self.assertTrue(node_with_children.has_children())
        self.assertFalse(node_without_children.has_children())

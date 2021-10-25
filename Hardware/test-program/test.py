import unittest
from main import identifyUser


class TestStringMethods(unittest.TestCase):

    def test_identifyUser(self):
        print("\n\ntest_identifyUser")
        print("=====================================")
        self.assertTrue(identifyUser())
        self.assertFalse(identifyUser())


if __name__ == '__main__':
    unittest.main()

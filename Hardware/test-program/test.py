import unittest
import os.path
from main import identifyUser, captureImage, recordVoice, eventNo, convCount


class TestStringMethods(unittest.TestCase):

    def test_identifyUser(self):
        print("\n\ntest_identifyUser")
        print("=====================================")
        self.assertTrue(identifyUser())
        self.assertFalse(identifyUser())

    def test_captureImage(self):
        print("\n\ntest_captureImage")
        print("=====================================")
        image = captureImage()
        self.assertTrue(os.path.isfile("img/"+image))

    def test_reordVoice(self):
        print("\n\ntest_recordVoice")
        print("=====================================")
        audio = recordVoice()
        self.assertTrue(os.path.isfile("aud/"+audio))


if __name__ == '__main__':
    unittest.main()

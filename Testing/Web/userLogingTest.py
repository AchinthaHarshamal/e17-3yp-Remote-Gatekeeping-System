import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class UserLoginTest(unittest.TestCase):

	def setUp(self):
		PATH = './chromedriver.exe'
		self.driver  = webdriver.Chrome(PATH)

	def test_loging_with_correct_user_name_and_password(self):
		driver = self.driver
		URL = 'https://gate-keeper.systems'
		driver.get(URL)
		
		assert 'Remote-Gatekeeper' in driver.title


	def tearDown(self):
		self.driver.close()


if __name__ == "__main__":
	unittest.main()
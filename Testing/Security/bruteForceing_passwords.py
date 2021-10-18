import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import random
import time

class Brute_Frocing_Password_Test(unittest.TestCase):

	def setUp(self):
		PATH = './geckodriver.exe'
		self.driver  = webdriver.Firefox(executable_path=PATH)


	def test_brute_frocing_password_attempt(self):
		user_email = 'tom@gmail.com'
		user_password = 'wrong_password'

		driver = self.driver
		URL = 'https://gate-keeper.systems'
		driver.get(URL)
		
		# check the Page loading with correct name
		assert 'Remote-Gatekeeper' in driver.title
		print("Page : " , driver.title)
		
		# Click on the signup form on nav-bar
		time.sleep(5)
		driver.implicitly_wait(10)
		login = driver.find_element_by_id('nav-signin')
		login.click();
		


		# fill the login form with user email
		driver.implicitly_wait(10)
		input_email = driver.find_element_by_id('email')
		input_email.click()
		input_email.send_keys(user_email)


		# filll the login form with password
		input_password = driver.find_element_by_id('password')

		aleart_exist = False
		attempts = 0 
		while(not aleart_exist and  attempts < 2):
			user_password= str(random. randint(1000000,1000000000))
			input_password.click()
			input_password.clear()
			input_password.send_keys(user_password)
			btn_submit = driver.find_element_by_id('signin-submit')
			btn_submit.click()
			time.sleep(1)
			try:
				alert = driver.switch_to.alert
				alert.accept()
				aleart_exist = True
			except :
				attempts +=1
				aleart_exist = False

		print('Number of Attempts : ' , attempts)



		time.sleep(5)


	def tearDown(self):
		
		self.driver.quit()


if __name__ == "__main__":
	unittest.main()
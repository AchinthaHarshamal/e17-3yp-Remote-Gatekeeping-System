import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

import time

class UserLoginTest(unittest.TestCase):
	
	def setUp(self):
		PATH = './geckodriver.exe'
		self.driver  = webdriver.Firefox(executable_path=PATH)


	def test_loging_with_correct_user_name_and_password(self):
		user_email = 'tom@gmail.com'
		user_password = '123456'
		dashboard_name = 'Tom Cruise'
		dashboard_email = 'tom@gmail.com'

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
		input_password.click()
		input_password.send_keys(user_password)

		# submit the login form
		btn_submit = driver.find_element_by_id('signin-submit')
		btn_submit.click()


		# check the user name and the email are correct or not
		time.sleep(5)
		name = driver.find_element_by_class_name('name')
		email = driver.find_element_by_class_name('email')


		assert  dashboard_name in name.text
		assert dashboard_email in email.text 

		print('User name : ' , name.text)
		print('Email : ' , email.text)

		time.sleep(10)


	def test_loging_with_wrong_user_name_or_wrong_password(self):
		user_email = 'achi@gmail.com'
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
		input_password.click()
		input_password.send_keys(user_password)

		# try to submit the login form
		btn_submit = driver.find_element_by_id('signin-submit')
		btn_submit.click()


		error = driver.find_element_by_css_selector('p')
		assert 'Wrong Password or Email ! Try again' in error.text
		print('Error message : ' , error.text)


		time.sleep(5)


	def tearDown(self):
		
		self.driver.quit()


if __name__ == "__main__":
	unittest.main()
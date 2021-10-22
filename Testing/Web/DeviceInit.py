import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

import time

class UserSignInTest(unittest.TestCase):
	def setUp(self):
		PATH = './geckodriver.exe'
		self.driver  = webdriver.Firefox(executable_path=PATH)



	def test_signup_with_valid_serialNumber(self):
		serialNumber =  'testId'

		fname = 'Tom'
		lname = 'Cruise'
		email= 'tom@gmail.com'
		password = '123456'
		cPassword = '123456'

		dashboard_name = 'Tom Cruise'
		dashboard_email = 'tom@gmail.com'

		driver = self.driver
		URL = 'https://gate-keeper.systems'
		driver.get(URL)
		
		# check the Page loading with correct name
		assert 'Remote-Gatekeeper' in driver.title
		print("Page : " , driver.title)


		time.sleep(5)

		# click on the connect devi
		driver.implicitly_wait(10)
		signup = driver.find_element_by_id('nav-init')
		signup.click();


		# input serial number and click the sumit button
		driver.implicitly_wait(10)
		input_serial = driver.find_element_by_id('nodeId')
		input_serial.click()
		input_serial.send_keys(serialNumber)

		submit_serial  = driver.find_element_by_id('serial-submit')
		submit_serial.click()

		# Fill the form 
		driver.implicitly_wait(15)
		fnameI = driver.find_element_by_id('firstName')
		lnameI = driver.find_element_by_id('lastName')
		emailI = driver.find_element_by_id('email')
		passwordI = driver.find_element_by_id('password')
		cPasswordI = driver.find_element_by_id('confirmpassword')
		submit_signup = driver.find_element_by_id('signup-btn')

		fnameI.click()
		fnameI.send_keys(fname)
		lnameI.click()
		lnameI.send_keys(lname)
		emailI.click()
		emailI.send_keys(email)
		passwordI.click()
		passwordI.send_keys(password)
		cPasswordI.click()
		cPasswordI.send_keys(cPassword) 

		# wait to input image file
		input('After mannually inputting the Image press Enter')
		submit_signup.click()

		time.sleep(5)
		driver.implicitly_wait(10)
		alert = driver.switch_to.alert
		alert.accept() 
		driver.implicitly_wait(10)
		name = driver.find_element_by_class_name('name')
		email = driver.find_element_by_class_name('email')

		# check whther given name is and email appears in the dashboard
		assert  dashboard_name in name.text
		assert dashboard_email in email.text 

		time.sleep(10)



	def tearDown(self):
		self.driver.quit()



if __name__ == "__main__" :
	unittest.main()






from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import time

from selenium.webdriver.remote.webelement import WebElement
import os.path

PATH = './geckodriver.exe' #'./chromedriver.exe'
URL = 'https://gate-keeper.systems/upload'

driver  = webdriver.Firefox(executable_path=PATH)

driver.get(URL)

driver.implicitly_wait(10)

print('Title of Website : ',driver.title)
img = driver.find_element_by_id('upload-img')
img.send_keys(os.getcwd()+'/tom.jpg')
img.click()
input('Enete to comfirm : ')
# time.sleep(10)
driver.close()
# driver.quit()


from selenium import webdriver
import time

PATH = './geckodriver.exe' #'./chromedriver.exe'
URL = 'https://gate-keeper.systems'

driver  = webdriver.Firefox(executable_path=PATH)

driver.get(URL)

print('Title of Website : ',driver.title)
# time.sleep(10)
# driver.close()
# driver.quit()


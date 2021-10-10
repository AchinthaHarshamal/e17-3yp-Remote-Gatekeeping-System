from selenium import webdriver

PATH = './chromedriver.exe'
URL = 'https://gate-keeper.systems'

driver  = webdriver.Chrome(PATH)

driver.get(URL)

print('Title of Website : ',driver.title)
driver.close()
# driver.quit

driver.get
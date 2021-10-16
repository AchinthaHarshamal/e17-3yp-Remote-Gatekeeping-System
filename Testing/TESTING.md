# Testing


**Functionalaties of the Administrative Web Service**
- Type : Automated 
- Framework , Simulators & Libraris : Selenium , Python Unittest
- Porgramming Languge : Python

***Selenium*** is an open-source automated testing framework for web applications. Selenium provides a playback tool for authoring functional tests without the need to learn a test scripting language. Intergration of selenium and ***Unittest*** provide much powerful functionalaties to test the web site.

| Test        | Description    | Pupose|Expected Result| Result |
|-------------|----------------|-------|-|-------|
|User Loging  (i)   | Use logging with correct email and password | Checking the user login with with correct Credential | Successful login  to the system, Initial message of the  History Table , Correct User name and the email appear on the Dashboard |Pass    |
|User Loging (ii)   | User loging with wrong email or password    | Try to log in with the wrong credential| Blocking the invalid users  |Pass    |
|Device initialize (i) | The device initializes with the correct serial number & Valid use information. | Checking whether the initialization work correctly or not |Successful signup to valid-user | Pass|
|Device initialize (ii) | Device initialize with incorrect serial number | Checking whether the initialization work with incorrect serial or not|Unable to sign up an invalid user| Pass|
|||||


**Secutiry Fetures of Backend & Frontend**
- Type : Manuall & automated
- Framework , Simulators & Libraris :  Players Ground of Firebase rules

| Test        | Description    | Pupose|Expected Result| Result |
|-------------|----------------|-------|-|-------|
|Malicious user logig|Brute Forcing password|Checking the security againsts the malicious access| security against the malicious access	Blocking the selected email after a few unsuccessful attempts for a time period|Pass (Number of attempts xx) |
|Datebase Access (i)|CRUD operation on the *Users , Messages , InitNodes , Evernts , Nodes* collections|To fine-grain tuning the outside access to the database|Users  - read and write access, authenticated users only for their collection.<br/><br/>Nodes - Read access to any outside users<br/>, write access only to authenticate users for their colle<br/><br/>|Pass|



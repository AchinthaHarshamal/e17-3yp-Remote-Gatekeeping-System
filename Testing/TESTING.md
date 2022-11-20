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
|Dashboard Funcinalitys | Histroy Table <br/>Device Status <br/> Number of Events<br/> Chart | To check whether Database Functionalaties works or not| Histroy Table updating correctly <br/> Device Status correctly appearing<br/> Event Count and Usage chart correctly updating | Some cases are stil not working|
||||||

<br/>
<br/>

**Secutiry Fetures of Backend & Frontend**
- Type : Manuall & automated
- Framework , Simulators & Libraris :  Players Ground of Firebase rules

| Test        | Description    | Pupose|Expected Result| Result |
|-------------|----------------|-------|-|-------|
|Malicious user loging|Brute Forcing password & Checking number of attempts|To test the security against malicious intrusion| security against the malicious access	Blocking the selected email after a few unsuccessful attempts for a time period|Pass (Number of attempts = 05) |
|Datebase Access (i)|CRUD operations on the *Users , Messages , InitNodes , Events , Nodes* collections for authenticated and unauthenticated users |To fine-grain tuning the outside access to the database|Users  - read and write access, authenticated users only for their collection.<br/><br/>Messages- Authenticated users for their own collection <br/><br/>InitNode - write access for authenticated users, read access only for system admin <br/><br/>Events - Authentcated users for there own collection<br/><br/>Nodes - Read access to any outside users , write access only to authenticate users for their collection<br/><br/>|Pass|
| Database Access (ii)|Data validatons|To check if authenticated users can edit databases with malicious content. |Stop unwanted data updates in the database & ensure the type safty|pass|
||||||



**Hardware**
- Type : Manuall
- Framework , Simulators & Libraris :  


| Test        | Description    | Pupose|Expected Result| Result |
|-------------|----------------|-------|-|-------|
|Mailbox Locking Unlocking|Check whether mailbox locking unlocking machanism work properly|check the securie delivery taking|Mobile phone user is able to open the mailbox|pass|
|Camera test|Capture a photo, using mobile phone signal|check the camera functionalaties|correctly capture the photo and shows on the phone|pass|
|Mic & Speaker test|Capture a voice using mic and play on the phone, Captue a voice using phone|Check the end to end |Corectly work mic, speake with phone|fail|
||||||
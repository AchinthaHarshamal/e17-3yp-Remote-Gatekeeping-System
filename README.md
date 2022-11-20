___
# Remote Gatekeeping System
### 3rd Year Project - Computer Engineering - UoP
### Project web site : https://cepdnaclk.github.io/e17-3yp-Remote-Gatekeeping-System/
___
## Team Members
- E/17/090, Achintha Harshamal, [email](mailto:achinthafharshamal@gmail.com), [GitHub](https://github.com/AchinthaHarshamal)
- E/17/027, Pubudu Bandara, [email](mailto:pubuducb@gmail.com), [GitHub](https://github.com/pubuducb)
- E/17/219, Ishara Nawarathna, [email](mailto:yc.ishara@gmail.com), [GitHub](https://github.com/IsharaNawarathna)
## Supervisors
- Dr. Isuru Nawinne, [email](mailto:isurunawinne@eng.pdn.ac.lk)
- Dr. Mahanama Wickramasinghe, [email](mailto:mahanamaw@eng.pdn.ac.lk)
## Overview
In the busy and complicated lifestyle today, keeping interactions with outsiders is, inefficient, impractical and vulnerable.
The ongoing pandemic has worsen the situation. 

We have understood that people are having troubles with taking online deliveries to their door steps securely.
Since people in Sri Lanka are so busy today, they can’t pay much attention about their loved ones and the household.
So, we thought of coming up with a system of interconnected devices (inspired from IoT) to make the life easy for the people.

Our goal is to provide a user-friendly and completely automated solution for the above problems, which will be a success even after the end of the pandemic.
## Main Components
- [Smart mailbox](#smart-mailbox)
- [Control unit with intercom](#control-unit-with-intercom)
- [Mobile controlling interface](#mobile-controlling-interface)
- [Administrative web services](#administrative-web-services)


## Control unit with intercom
This is the main component of the system. This is where the iot device is at and it contorls the behaviour of the whole system. Control unit is mainly interacted by the outside user(delivery person, postman) and this helps the inside user(homeowner) to control the whole system.  
  
### Features of the control unit:    
1. Camera module : Can be used to take a photo remotely of the outside user. Controlled by the inside user.  
2. Intercom-System : Consits with a speaker and a microphone. Used to intercom communication between inside user and the outside user.  
3. Outside user can give their contact information to the inside user.  
4. Controlling the smart mailbox and smart gatelocking system.  

## Smart mailbox

This is used for safely receive the delivery package from the delivery person without having any physical interactions with the delivery person. It doesn't matter where the homeowner when the delivery person comes to the door, delivery can be get into the hands of homeowner without having to worry about the facts such as delivey might get lost or damaged.  
  
### How it works:  
1. Whenever the delivery person is at the gate, he can request the inside person to open up the smart mail box.   
2. Inside user(home owner) gets a notification to his/her phone , informing that there is a delivery person is at the gate.  
3. Inside user can access the camera module in the control unit and get a photo of the delivery person and see if that is an actual delivery person.  
4. Inside user can commiunicate with the delivery person using the intercom system which is integrated to the control unit.  
5. Inside user can unlock and open up the smart mail box.  
6. Delivery person can place the delivery package inside the smart mailbox.  
7. Inside user can close and relock the smart mailbox.    
  
The speciality of this component is that the homeowners can get the delivery package without having to be at the home when the delivery arrives to the home.They can safetly receive deliveries and it doesn't matter where they are at.   
Another advantage is that , it reduces the human interactions significantly. This is a very good solution for ongoing corona outbreak as we    


  
  
## Mobile controlling interface
This is the main interface the regular user of the system interacts with. The "Main Users" can response to the various requests of visitors/delivery person. Provides information as real time notifications.

### Main features of the Mobile Interface
1. Intercom communications with the outsiders
2. Accessing the Smart Mailbox/Smart Gate lock with remote signals
3. Identifying the outsiders through audio and video channels

## Administrative web services
Web services provide another interface for the users to interact with the system. Also, it manages the user data and user authentication.

### Freatures provided as the Web Services
1. Initializing the system and registration of the user
2. Establishing the connection between the user account and the IoT device
3. To download the mobile application


## Testing Results
  - for Testing results **click [here](./Testing/TESTING.md)**
  

## CAD & CAM
  - CAD and CAM views are availalbe [here](./cad-cam/CADCAM.md) 
  - Design files are available [here](./cad-cam/)

## Packagins
  - Control unit

    <img src="docs\images\packaging.png" width="300"><br>
    <img src="docs\images\controlunit1.jpg" width="150"><br>
    <img src="docs\images\controlunit2.jpg" width="150"><br>

  - Mailbox

    <img src="docs\images\mailbox1.jpg" width="100"><br>
    <img src="docs\images\mailbox2.jpg" width="150"><br>
    <img src="docs\images\mailbox3.jpg" width="150"><br>
    
## Manuals
  - User Manual is available [here](./milestone4-files/Manuals/User_Manual/Group_19_User_Manual.pdf) 
  - Design Manual is available [here](./milestone4-files/Manuals/Design_Manual/Group_19_Design_Manual.pdf)
    
## Design Manual

  - Design manual is implemented using graphics.

    <img src="milestone4-files/Manuals/User_Manual/Moblie App/Screens/Interaction_Steps.png" width="150"><br>
    <img src="milestone4-files/Manuals/User_Manual/Moblie App/Screens/Previous_Events_Screen.png" width="150"><br>
    <img src="milestone4-files/Manuals/User_Manual/Moblie App/Screens/Close_Event_Screen.png" width="150"><br>



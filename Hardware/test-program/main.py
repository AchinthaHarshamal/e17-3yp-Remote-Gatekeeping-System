from datetime import datetime
from time import sleep, time
from shutil import copyfile
import pyrebase
#  third-party helper library for interacting with the REST API
import RPi.GPIO as GPIO
from picamera import PiCamera
from signal import signal, SIGTERM, SIGHUP, pause
from rpi_lcd import LCD


def initKeys():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
    GPIO.setup(8, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def first_choice():
    while True:
        if GPIO.input(8) == GPIO.HIGH:
            return True
        elif GPIO.input(10) == GPIO.HIGH:
            return False
        sleep(0.1)


def getNodeID():
    with open("serial.txt", "r") as file:
        serialNo = file.read()
    nodeid = db.child("nodes").child(serialNo).get().val()["nodeId"]
    return nodeid


def safe_exit(signum, frame):
    exit(1)
    
def print_lcd(str1, str2):
    lcd = LCD()
    try:
        signal(SIGTERM, safe_exit)
        signal(SIGHUP, safe_exit)
        lcd.text(str1, 1)
        lcd.text(str2, 2)
    except KeyboardInterrupt:
        pass


def startEvent():
    print("Press Enter to INIT the system")
    print("------------------------------")
    print_lcd('Press (1) to', 'INIT the system')
    sleep(1)
    if first_choice():
        pass

    with open('last_event.txt', 'r') as readfile:
        for line in readfile:
            pass
        data = line.split()

    today = str(datetime.utcnow().date())

    global eventNo
    eventNo = 0 if data[0] != today else int(data[1]) + 1

    with open('last_event.txt', 'w') as writefile:
        writefile.write(today+' '+str(eventNo))


def getFilename():
    return str(datetime.utcnow().date())+'E'+str(eventNo)


def captureImage():
    print("\t<capturing_the_picture...>")
    print_lcd('Capturing the', 'Image...')
    sleep(1)
    filename = getFilename()+'.jpg'
    src = str(eventNo % 5)+".jpg"
    copyfile("img/templates/"+src, "img/"+filename)
    #camera = PiCamera()
    sleep(5)
    #camera.capture('/home/pi/Desktop/3yp/e17-3yp-Remote-Gatekeeping-System/Hardware/test-program/img/' + filename)
    #camera.close()
    # open('img/'+filename, 'w')
    print("\t<done>")
    return filename


def identifyUser():
    print("Delivery (1) or a Visitor (2)? ")
    print_lcd('Delivery (1) or', 'a Visitor (2)?')
    return first_choice()  # true if delivery


config = {
    "apiKey": "AIzaSyA2lgAuXNJGVoeg_QVf7wXb4oRVH3lXyic",
    "authDomain": "gate-keeper-6fad9.firebaseapp.com",
    "databaseURL": "https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app",
    "storageBucket": "gate-keeper-6fad9.appspot.com"
}


def firebaseAuth():
    firebase = pyrebase.initialize_app(config)
    storage = firebase.storage()
    db = firebase.database()
    return storage, db


def getTime():
    return str(datetime.utcnow().date())+'T'+str(datetime.utcnow().time())[:-3]+'Z'


def createData(msgType, url):
    return {
        "event": eventNo,
        "from": "device",
        "msgType": msgType,
        "msgURL": url,
        "time": getTime(),
        "to": "all"
    }


NODEID = "-Mms_cdcEVk_ygXOg6qA"
PATH = "messages/"+NODEID+"/"
DELAY = 180
audioID = ""


def timeout(init_time):
    return True if time() - init_time < DELAY else False


def handleAck(message):
    global not_updated
    try:
        # print(message["data"])
        if message["data"].get("ack") == "true":
        # if message["data"] == "true":
            not_updated = False
    except:
        pass


def handleVoiceListen(message):
    global not_updated, audioID
    try:
        # print(message["data"])
        if message["data"].get("status") == "LISTENING":
        # if message["data"] == "LISTENING":
            if audioID == "":
                audioID = message["path"].split("/")[1]
            not_updated = False
    except:
        pass


def handleVoiceRecord(message):
    global not_updated
    try:
        # print(message["data"])
        if message["data"].get("status") == "RECORDING":
        # if message["data"] == "RECORDING":
            not_updated = False
    except:
        pass


def handleVoiceSend(message):
    global update, not_updated
    try:
        # print(message["data"])
        if message["data"].get("status") == "SENDING":
        # if message["data"].get("msgURL")[0] == "m":
        # if message["data"][0] == "m":
            update = message["data"].get("msgURL")
            # update = message["data"]
            not_updated = False
    except:
        pass


def handleMailboxAccess(message):
    global permitted, not_updated
    try:
        # print(message["data"])
        if message["data"].get("status") == "ACCESS_GIVEN":
        # if message["data"] == "ACCESS_GIVEN":
            not_updated = False
            permitted = True
        if message["data"].get("msgType") == "ACCESS_DENIED":
        # elif message["data"] == "ACCESS_DENIED":
            not_updated = False
    except:
        pass


def initStream(streamHandler):
    global init_time, not_updated, stream
    init_time = time()
    not_updated = True
    if audioID == "":
        messagePath = PATH
    else:
        messagePath = PATH+audioID
    stream = db.child(messagePath).stream(streamHandler)


def waitForResponse():
    global not_updated, stream
    waiting = True
    while not_updated and waiting:
        print("\t\t<waiting_for_response...>")
        print_lcd('Waiting for', 'the response...')
        sleep(1)
        waiting = timeout(init_time)
    try:
        stream.close()
    except AttributeError:
        pass
    not_updated = True
    print("\t\t<responded>")
    return waiting


def sendUserData():
    print("\t<sending_user_information...>")
    print_lcd('Sending user', 'information...')
    storage.child(PATH+image).put("img/"+image)
    url = storage.child(PATH+image).get_url(None)

    data = createData("image", url)
    data["ack"] = ""
    data["userType"] = "delivery" if isDelivery else "visitor"

    initStream(handleAck)
    db.child("messages").child(NODEID).push(data)
    print("\t<done>")


def conversation():
    global firstConv
    if firstConv:
        print("Do you want to send a message?")
        print("Press 1:Yes 2:No ")
        print_lcd('Send a message?', '1:Yes, 2:No')
        firstConv = False
    else:
        print("Send message or Mailbox access?")
        print("Press 1:Message 2:Mailbox ")
        print_lcd('Msg or Mailbox?', '1:Msg, 2:Mailbox')
    return first_choice()


def recordVoice():
    print("\t<recording_voice...>")
    print_lcd('Recording', 'voice...')
    filename = getFilename()+'N'+str(convCount)+'.mp3'
    src = str(int(convCount / 2) % 2)+".mp3"
    copyfile("aud/templates/"+src, "aud/"+filename)
    # open('aud/'+filename, 'w')
    print("\t<done>")
    return filename


def sendVoice():
    print("\t<sending_voice...>")
    print_lcd('Sending', 'voice...')
    if convCount == 2:
        storage.child(PATH+audio).put("aud/"+audio)
        url = storage.child(PATH+audio).get_url(None)

        data = createData("AUDIO", url)
        data["status"] = "NONE"

        print("\t<waiting_for_ack...>")
        print_lcd('Waiting for', 'ack...')
        isAcked = waitForResponse()
        print("\t<acked>")
        db.child("messages").child(NODEID).push(data)
    else:
        storage.child(PATH+audio).put("aud/"+audio)
        url = storage.child(PATH+audio).get_url(None)

        #################################################
        db.child("messages").child(NODEID).child(audioID).update({"status": "NONE"})
        db.child("messages").child(NODEID).child(audioID).update({"msgURL": url})
    print("\t<sent>")


def voiceDelivered():
    print("\t<waiting_for_listen...>")
    print_lcd('Waitong for', 'listening...')
    initStream(handleVoiceListen)
    isListening = waitForResponse()
    print("\t<listening>")
    print("User is listening!")
    print_lcd('User is', 'listening...')
    return isListening


def waitForRecording():
    print("\t<waiting_for_record...>")
    print_lcd('Waitong for', 'record...')
    initStream(handleVoiceRecord)
    isRecording = waitForResponse()
    print("\t<recording>")
    print("User is recording!")
    print_lcd('User is', 'recording...')


def waitForSending():
    print("\t<waiting_for_send...>")
    print_lcd('Waitong for', 'sending...')
    initStream(handleVoiceSend)
    isSending = waitForResponse()
    print("\t<sending>")
    print("User is sending!")
    print_lcd('User is', 'sending...')


def waitForPermission():
    print("\t<waiting_for_permission...>")
    print_lcd('Waitong for', 'permission...')
    initStream(handleMailboxAccess)
    permitted = waitForResponse()
    print("\t<replied>")


def getVoice():
    print("\t<downloading_voice...>")
    print_lcd('Downloading', 'voice...')
    # storage.child(update).download("img/"+update.split("/")[-1])
    sleep(2)
    print("\t<done>")


def playVoice():
    print("Playing user's message")
    print_lcd('Playing user', 'message...')
    print("\t<playing_voice...>")
    sleep(2)
    print("\t<done>")


def noReplyResponse():
    print("No reply!")


def askMailboxAccess():
    #################################################
    db.child("messages").child(NODEID).child(audioID).update({"msgType": "MAIL_BOX_ACCESS"})
    waitForPermission()
    print("User permitted access!" if permitted else "User denied access!")
    if permitted:
        print_lcd('User permitted', 'access!')
    else:
        print_lcd('User denied', 'access!')


def openMailbox():
    print("Mailbox lock is open, place the delivery")
    print_lcd('Mailbox is', 'open!')


def waitForMailboxClosed():
    sleep(2)
    print("Mailbox is closed!")
    print_lcd('Mailbox is', 'closed!')


def endEvent():
    print("------------------------------")
    print("Thank you, Have a nice day!\n")
    print_lcd('Thank you', 'Have a nice day')
    db.child("messages").child(NODEID).child(audioID).update({"msgType": "CLOSED"})
    sleep(2)


if __name__ == "__main__":
    """ TODO
    1. getVoice() path: img -> aud
    2. auth
    3. change testId
    4. DELAY
    5. getVoice() download file
    6. visitor branch

    ->  noReplyResponse(), closeMailbox(), updateMailboxState()
    """
    storage, db = firebaseAuth()
    # NODEID = getNodeID()
    eventNo = 0

    while True:

        initKeys()
        startEvent()
        image = captureImage()
        isDelivery = identifyUser()
        sendUserData()

        convCount = 0
        update = ""
        firstConv = True
        while conversation():
            sleep(1)
            audio = recordVoice()
            convCount += 2
            sendVoice()
            if voiceDelivered():
                waitForRecording()
                waitForSending()
                getVoice()
                playVoice()
            else:
                noReplyResponse()
                break

        if isDelivery and audioID != "":
            permitted = False
            askMailboxAccess()
            if permitted:
                openMailbox()
                waitForMailboxClosed()
            else:
                pass
        else:
            pass

        sleep(1)
        print('SECOND CONV')
        firstConv = True
        while conversation():
            db.child("messages").child(NODEID).child(audioID).update({"msgType": "AUDIO"})
            audio = recordVoice()
            convCount += 2
            sendVoice()
            if voiceDelivered():
                waitForRecording()
                waitForSending()
                getVoice()
                playVoice()
            else:
                noReplyResponse()
                break

        endEvent()
        audioID = ""

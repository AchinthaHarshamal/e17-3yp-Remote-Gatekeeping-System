from datetime import datetime
from time import sleep, time
from shutil import copyfile
import pyrebase
#  third-party helper library for interacting with the REST API


def getNodeID():
    with open("serial.txt", "r") as file:
        serialNo = file.read()
    nodeid = db.child("nodes").child(serialNo).get().val()["nodeId"]
    return nodeid


def startEvent():
    input("Press Enter to INIT the system ")
    print("------------------------------")


def getFilename():
    return str(datetime.utcnow().date())+'E'+str(eventNo)


def captureImage():
    print("\t<capturing_the_picture...>")
    sleep(1)
    filename = getFilename()+'.jpg'
    src = str(eventNo % 4)+".jpg"
    copyfile("img/templates/"+src, "img/"+filename)
    # open('img/'+filename, 'w')
    print("\t<done>")
    return filename


def identifyUser():
    userType = input("Delivery (d) or a Visitor (v)? ")
    return True if userType == "d" else False  # true if delivery


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


NODEID = "-MmSuW2k2OdZxIOqkBE-"
PATH = "messages/"+NODEID+"/"
DELAY = 120
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
        sleep(1)
        waiting = timeout(init_time)
    stream.close()
    not_updated = True
    print("\t\t<responded>")
    return waiting


def sendUserData():
    print("\t<sending_user_information...>")
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
        msg = input("Press 1:Yes 2:No ")
        firstConv = False
    else:
        print("Send message or Mailbox access?")
        msg = input("Press 1:Message 2:Mailbox ")
    return True if msg == '1' else False


def recordVoice():
    print("\t<recording_voice...>")
    sleep(2)
    filename = getFilename()+'N'+str(convCount)+'.mp3'
    src = "0.mp3"
    copyfile("aud/templates/"+src, "aud/"+filename)
    # open('aud/'+filename, 'w')
    print("\t<done>")
    return filename


def sendVoice():
    print("\t<sending_voice...>")
    if convCount == 2:
        storage.child(PATH+audio).put("aud/"+audio)
        data = createData("AUDIO", PATH+audio)
        data["status"] = "NONE"
        print("\t<waiting_for_ack...>")
        isAcked = waitForResponse()
        print("\t<acked>")
        db.child("messages").child(NODEID).push(data)
    else:
        db.child("messages").child(NODEID).child(audioID).update({"status": "NONE"})
        db.child("messages").child(NODEID).child(audioID).update({"msgURL": PATH+audio})
    print("\t<sent>")


def voiceDelivered():
    print("\t<waiting_for_listen...>")
    initStream(handleVoiceListen)
    isListening = waitForResponse()
    print("\t<listening>")
    print("User is listening!")
    return isListening


def waitForRecording():
    print("\t<waiting_for_record...>")
    initStream(handleVoiceRecord)
    isRecording = waitForResponse()
    print("\t<recording>")
    print("User is recording!")


def waitForSending():
    print("\t<waiting_for_send...>")
    initStream(handleVoiceSend)
    isSending = waitForResponse()
    print("\t<sending>")
    print("User is sending!")


def waitForPermission() -> bool:
    print("\t<waiting_for_permission...>")
    initStream(handleMailboxAccess)
    permitted = waitForResponse()
    print("\t<replied>")


def getVoice():
    print("\t<downloading_voice...>")
    # storage.child(update).download("img/"+update.split("/")[-1])
    sleep(2)
    print("\t<done>")


def playVoice():
    print("Playing user's message")
    print("\t<playing_voice...>")
    sleep(2)
    print("\t<done>")


def noReplyResponse():
    print("No reply!")


def askMailboxAccess():
    db.child("messages").child(NODEID).child(audioID).update({"msgType": "MAIL_BOX_ACCESS"})
    waitForPermission()
    print("User permitted access!" if permitted else "User denied access!")


def openMailbox():
    print("Mailbox lock is open, place the delivery")


def waitForMailboxClosed():
    print("Close the mailbox!")
    sleep(2)


def endEvent():
    global eventNo
    eventNo += 1
    print("------------------------------")
    print("Thank you, Have a nice day!\n")


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

        startEvent()
        image = captureImage()
        isDelivery = identifyUser()
        sendUserData()

        convCount = 0
        update = ""
        firstConv = True
        while conversation():
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

        firstConv = True
        while conversation():
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

        audioID = ""
        endEvent()

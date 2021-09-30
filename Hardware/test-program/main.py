from datetime import datetime
from time import sleep, time
import pyrebase
#  third-party helper library for interacting with the REST API


def startEvent():
    input("Press Enter to INIT the system ")
    print("------------------------------")


def getFilename():
    return str(datetime.utcnow().date())+'E'+str(eventNo)


def captureImage():
    print("\t<capturing_the_picture...>")
    filename = getFilename()+'.jpg'
    open('img/'+filename, 'w')
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


NODEID = "-MjhnXW1CcA_sTXEssD1"
PATH = "messages/"+NODEID+"/"
DELAY = 500
AUDIOID = ""


def timeout(init_time):
    return True if time() - init_time < DELAY else False


def handleAck(message):
    global not_updated
    try:
        if message["data"].get("ack") == "true":
        # if message["data"] == "true":
            not_updated = False
    except:
        pass


def handleVoiceSend(message):
    global update, not_updated
    try:
        if message["data"].get("msgURL")[0] == "m":
        # if message["data"][0] == "m":
            update = message["data"].get("msgURL")
            not_updated = False
    except:
        pass


def handleVoiceListen(message):
    global not_updated, AUDIOID
    try:
        if message["data"].get("status") == "LISTENING":
        # if message["data"] == "LISTENING":
            AUDIOID = message["path"].split("/")[1]
            not_updated = False
    except:
        pass


def handleVoiceRecord(message):
    global not_updated
    try:
        if message["data"].get("status") == "RECORDING":
        # if message["data"] == "RECORDING":
            not_updated = False
    except:
        pass


def initStream(streamHandler):
    global init_time, not_updated, my_stream1
    init_time = time()
    not_updated = True
    my_stream1 = db.child(PATH).stream(streamHandler)


def waitForResponse():
    global not_updated, my_stream1
    waiting = True
    while not_updated and waiting:
        print("\t\t<waiting_for_response...>")
        sleep(1)
        waiting = timeout(init_time)
    my_stream1.close()
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
    msg = input("Do you want to send a message? ")
    return True if msg == '' else False


def recordVoice():
    print("\t<recording_voice...>")
    filename = getFilename()+'N'+str(convCount)+'.mp3'
    open('aud/'+filename, 'w')
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
        db.child("messages").child(NODEID).child(AUDIOID).update({"status": "NONE"})
        db.child("messages").child(NODEID).child(AUDIOID).update({"msgURL": PATH+audio})
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


def getVoice(path):
    print("\t<downloading_voice...>")
    storage.child(path).download("img/"+path.split("/")[-1])
    print("\t<done>")


def playVoice():
    print("Playing user's message")
    print("\t<playing_voice...>")
    sleep(2)
    print("\t<done>")


def noReplyResponse():
    print("No reply!")


def endEvent():
    global eventNo
    eventNo += 1
    print("------------------------------")
    print("Exited the system!\n")


if __name__ == "__main__":
    """ TODO
    1. MAIL_BOX_ACCESS -> ACCESS_GIVEN
    2. auth
    3. getVoice() path: img -> aud
    4. getVoice() -> update

    ->  noReplyResponse(), openMailbox(), closeMailbox(), 
        openGate(), closeGate(), updateMailboxState()
    """
    eventNo = 29

    startEvent()
    image = captureImage()
    isDelivery = identifyUser()
    storage, db = firebaseAuth()
    sendUserData()

    convCount = 0
    update = ""
    while conversation():
        audio = recordVoice()
        convCount += 2
        sendVoice()
        if voiceDelivered():
            waitForRecording()
            waitForSending()
            getVoice(update)
            playVoice()
        else:
            noReplyResponse()
            break

    endEvent()

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
    print("<capturing_the_picture...>", end=' ')
    filename = getFilename()+'.jpg'
    open('img/'+filename, 'w')
    print("<done>")
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


def timeout(init_time):
    return True if time() - init_time < DELAY else False


def handleAck(message):
    global not_updated
    try:
        # if message["data"].get("ack") == "true":
        if message["data"] == "true":
            not_updated = False
    except:
        pass


def stream_handler(message):
    global update, not_updated
    try:
        if "msgURL" in message["data"]:
            update = message["data"].get("msgURL")
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
        print("<waiting_for_response...>")
        sleep(1)
        waiting = timeout(init_time)
    my_stream1.close()
    not_updated = True
    print("<responded>")
    return waiting


def sendUserData():
    print("<sending_user_information...>", end=' ')
    storage.child(PATH+image).put("img/"+image)
    url = storage.child(PATH+image).get_url(None)

    data = createData("image", url)
    data["ack"] = ""
    data["userType"] = "delivery" if isDelivery else "visitor"

    initStream(handleAck)
    db.child("messages").child(NODEID).push(data)
    print("<done>")


def conversation():
    msg = input("Do you want to send a message? ")
    return True if msg == '' else False


def recordVoice():
    print("<recording_voice...>", end=' ')
    filename = getFilename()+'N'+str(convCount)+'.mp3'
    open('aud/'+filename, 'w')
    print("<done>")
    return filename


def sendVoice():
    print("<sending_voice...>", end=' ')
    storage.child(PATH+audio).put("aud/"+audio)
    data = createData("audio", PATH+audio)
    data["status"] = ""
    isAcked = waitForResponse()
    db.child("messages").child(NODEID).push(data)
    print("<sent>")


def receivedVoice():
    initStream(stream_handler)
    return waitForResponse()


def getVoice(path):
    print("<downloading_voice...>", end=' ')
    storage.child(path).download("img/"+path.split("/")[-1])
    print("<done>")


def playVoice():
    print("<playing_voice...>", end=' ')
    sleep(2)
    print("<done>")


def noReplyResponse():
    print("No reply!")


def endEvent():
    global eventNo
    eventNo += 1
    print("Exited the system!\n")


if __name__ == "__main__":
    """ TODO
    1. <done>
    2. auth
    3. stream handlers
    4. sendVoice() -> isAcked
    5. getVoice() path: img -> aud

    ->  noReplyResponse(), openMailbox(), closeMailbox(), 
        openGate(), closeGate(), updateMailboxState()
    """
    eventNo = 13

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
        if receivedVoice():
            getVoice(update)
            playVoice()
        else:
            noReplyResponse()
            break

    endEvent()

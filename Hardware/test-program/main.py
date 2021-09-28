from datetime import datetime
from time import sleep, time
from pyasn1.type.tag import initTagSet
import pyrebase
#  third-party helper library for interacting with the REST API


def startEvent():
    input("Press Enter to INIT the system ")
    print("------------------------------")


def getFilename():
    return str(datetime.utcnow().date())+'E'+str(eventNo)


def captureImage():
    print("<capturing_the_picture...>", end=' ')
    filename = getFilename()+'.png'
    # open('img/'+filename, 'w')
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


def sendUserData():
    print("<sending_user_information...>", end=' ')
    storage.child(PATH+image).put("img/"+image)
    url = storage.child(PATH+image).get_url(None)
    data = createData("image", url)
    data["ack"] = ""
    data["userType"] = "delivery" if isDelivery else "visitor"
    # initStream()
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


def stream_handler1(message):
    global count1, not_updated
    if count1 == 1:
        # if message["data"].get("ack") == "true":
        if message["data"] == "true":
            print("acked")
            not_updated = False
    count1 += 1


def initStream():
    global not_updated, count1, my_stream1
    not_updated = True
    count1 = 0
    my_stream1 = db.child(PATH).stream(stream_handler1)


def waitForAck():
    global not_updated, count1, my_stream1
    not_updated = True
    count1 = 0
    my_stream1 = db.child(PATH).stream(stream_handler1)
    while not_updated:
        print("<waiting_for_ack...>")
        sleep(1)
    my_stream1.close()
    print("<acked>")


def sendVoice():
    print("<sending_voice...>", end=' ')
    storage.child(PATH+audio).put("aud/"+audio)
    data = createData("audio", PATH+audio)
    waitForAck()
    db.child("messages").child(NODEID).push(data)
    print("<done>")


def stream_handler(message):
    # print(message["event"]) -> put
    # print(message["path"]) -> /-K7yGTTEp7O549EzTYtI
    global count, update, not_recieved
    if count == 1:  # first iteration is neglected
        not_recieved = False
        update = message["data"].get("msgURL")
    count += 1


DELAY = 500


def timeout(init_time):
    return True if time() - init_time < DELAY else False


def receivedVoice():
    global not_recieved, count
    not_recieved = True
    count = 0
    init_time = time()
    my_stream = db.child(PATH).stream(stream_handler)
    waiting = True
    while not_recieved and waiting:
        print("<waiting_for_audio...>")
        sleep(1)  # to reduce computation
        waiting = timeout(init_time)
    my_stream.close()
    print("<done>")
    return waiting  # true if received


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
    3. waitForAck() time
    4. initAck()
    5. .png -> .jpg
    6. generalize stream_handler()

    ->  noReplyResponse(), openMailbox(), closeMailbox(), 
        openGate(), closeGate(), updateMailboxState()
    """
    eventNo = 3

    startEvent()
    image = captureImage()
    isDelivery = identifyUser()
    storage, db = firebaseAuth()
    sendUserData()

    convCount = 0
    update = 0
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

class Event {
  constructor(
    id,
    name,
    date,
    rating,
    description,
    isMailBoxAccessed,
    imageURL,
    userType
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.rating = rating;
    this.description = description;
    this.isMailBoxAccessed = isMailBoxAccessed;
    this.voiceMessages = [];
    this.imageURL = imageURL;
    this.userType = userType;
  }
}

export default Event;

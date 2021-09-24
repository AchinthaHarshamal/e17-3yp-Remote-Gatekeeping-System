import Event from "../Modal/Event";

export const PreviousEventsList = [
  new Event(
    "e1",
    "Amazon Deliveries",
    new Date(2018, 11, 24, 10, 33, 30, 0),
    4,
    "This was a delivery of the laptop",
    true,
    "../dummy data/dummyImages/e1.jpg"
  ),
  new Event(
    "e2",
    "James Visiting",
    new Date(2019, 10, 5, 9, 23, 30, 0),
    2,
    "This was the event when james visited",
    false,
    "../dummy data/dummyImages/e2.jpg"
  ),
  new Event(
    "e3",
    "Pizza Hut delivery",
    new Date(2019, 11, 12, 16, 15, 30, 0),
    5,
    "This was a pizza delivery from the pizza hut",
    true,
    "../dummy data/dummyImages/e3.jpg"
  ),
  new Event(
    "e4",
    "Ebay delivery",
    new Date(2020, 11, 12, 16, 15, 30, 0),
    1,
    "Tv delivery from the EBAY",
    true,
    "../dummy data/dummyImages/e4.jpg"
  ),
];

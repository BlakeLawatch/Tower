export class Ticket{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.event = data.event
        this.profile = data.profile
        this.eventId = data.eventId
    }

}

const ticket = 
    {
        "eventId": "65440e714e91c78844e5049d",
        "accountId": "6541827fc58db642d7c02476",
        "_id": "6544262b4e91c78844e5059b",
        "createdAt": "2023-11-02T22:43:55.648Z",
        "updatedAt": "2023-11-02T22:43:55.648Z",
        "__v": 0,
        "profile": {
            "_id": "6541827fc58db642d7c02476",
            "subs": [
                "auth0|6541827f39444cc3fe9a23a7"
            ],
            "email": "anothernewemail@new.email",
            "name": "anothernewemail",
            "picture": "https://s.gravatar.com/avatar/87d93fa56cfb84f69fde33613bc552ea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fan.png",
            "createdAt": "2023-10-31T22:46:30.754Z",
            "updatedAt": "2023-10-31T22:46:30.754Z",
            "__v": 0,
            "id": "6541827fc58db642d7c02476"
        },
        "id": "6544262b4e91c78844e5059b"
    }

    const betterTicket = {
        "_id": "65440a124e91c78844e503fb",
        "eventId": "65440a114e91c78844e503f6",
        "accountId": "6541827fc58db642d7c02476",
        "createdAt": "2023-11-02T20:44:02.112Z",
        "updatedAt": "2023-11-02T20:44:02.112Z",
        "__v": 0,
        "event": {
            "_id": "65440a114e91c78844e503f6",
            "creatorId": "6541827fc58db642d7c02476",
            "name": "Big Sports Game",
            "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
            "coverImg": "https://images.unsplash.com/photo-1542727934-07691d6ebf0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
            "location": "At The Social Expo Center",
            "capacity": 10,
            "startDate": "2023-11-20T07:00:00.000Z",
            "isCanceled": false,
            "type": "sport",
            "createdAt": "2023-11-02T20:44:01.811Z",
            "updatedAt": "2023-11-02T20:44:01.811Z",
            "__v": 0,
            "id": "65440a114e91c78844e503f6"
        },
        "id": "65440a124e91c78844e503fb"
    }

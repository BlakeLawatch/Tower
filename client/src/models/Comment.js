export class Comment{
    constructor(data){
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.isAttending = data.isAttending
        this.creator = data.creator
    }
}


const comment = {
    "_id": "6545769b8ed80f0dfdd1b6ad",
    "creatorId": "6541827fc58db642d7c02476",
    "eventId": "65440a034e91c78844e503c1",
    "body": "xsxsxsxsx",
    "isAttending": false,
    "createdAt": "2023-11-03T22:39:23.038Z",
    "updatedAt": "2023-11-03T22:39:23.038Z",
    "__v": 0,
    "creator": {
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
    "id": "6545769b8ed80f0dfdd1b6ad"
}
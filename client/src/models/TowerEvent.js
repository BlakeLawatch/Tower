export class TowerEvent {
    constructor(data){
        this.id = data.id 
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg || "src/assets/img/damian-patkowski-T-LfvX-7IVg-unsplash.jpg"
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCanceled = data.isCanceled || false
        this.type = data.type
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}

const towerEvent = {
    "_id": "65425ffb393c8e22d56f51f6",
    "creatorId": "6541827fc58db642d7c02476",
    "name": "Mega Marky",
    "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
    "coverImg": "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
    "location": "At The Social Expo Center",
    "capacity": 8,
    "startDate": "2023-11-17T07:00:00.000Z",
    "isCanceled": false,
    "type": "concert",
    "createdAt": "2023-11-01T14:26:03.157Z",
    "updatedAt": "2023-11-01T14:26:03.157Z",
    "__v": 0,
    "id": "65425ffb393c8e22d56f51f6"
}

var groups = [
    {
        id: 1,
        name: "Group 1",
        members: [1, 2, 3],
        days: [
            {
                date: "2000-01-01",
                boards: [
                    {
                        id: 1,
                        name: "Lunch",
                        elements: [
                            {
                                id: 1,
                                name: "Spaghetti",
                                category: 0,
                                subscribers: [1],
                                producer: 1
                            },
                            {
                                id: 2,
                                name: "Spaghetti",
                                category: 0,
                                subscribers: [2],
                                producer: 1
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "Dinner",
                        elements: [
                            {
                                id: 1,
                                name: "KFC",
                                category: 2,
                                subscribers: [1, 2, 3],
                                producer: 3
                            }
                        ]
                    }
                ]
            }
        ],
        lists: [
            {
                id: 1,
                name: "Groceries",
                elements: [
                    {
                        id: 1,
                        ready: false,
                        text: "Milk"
                    },
                    {
                        id: 2,
                        ready: false,
                        text: "Bread"
                    }
                ]
            },
            {
                id: 2,
                name: "Cleaning",
                elements: [
                    {
                        id: 1,
                        ready: false,
                        text: "Soap"
                    }
                ]
            }
        ]
    }
];

module.exports = groups;

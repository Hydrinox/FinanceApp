module.exports = {
    dbHost: 'localhost:27017',
    dbName: 'finance-app',
    secret: '%30x;aWja2/1&4@1241d!0f-@34asd;flkjbxzvk4j6$%&!;aslkc!@;aslkajfa;lsdkfj!@#!$%^&#art!!ASDF~!!@#',
    clientUrl: 'https://noxfinance-frontend.herokuapp.com', //https://localhost:4200
    defaultIncome: {
        'value': 50000,
        'frequency': 'yearly'
    },
    defaultExpenses: [
        {
            'name': 'Rent',
            'value': 1200
        },
        {
            'name': 'Car Payment',
            'value': 500
        },
        {
            'name': 'Groceries',
            'value': 400
        }
    ],
    defaultRetirement: {
        'currentAge': 25,
        'retirementAge': 65,
        'startPrincipal': 15000,
        'contributions': 250,
        'growthRate': 7,
    }
}
const user = {
    name: 'Mary',
    transactions: [],
    balance: 0
};

const newTransactions = [
    {
        type: 'credit',
        value: 50.5
    },
    {
        type: 'debit',
        value: 100
    },
    {
        type: 'credit',
        value: 50
    }
]

function addTransactionToUser (aTransaction, aUser) {
    aUser.transactions.push(aTransaction);
    if(aTransaction.type === 'credit')
        aUser.balance += aTransaction.value;
    else
        aUser.balance -= aTransaction.value;
}

function addAllNewTransactions (transactions, aUser) {
    for(let transaction of transactions) {
        addTransactionToUser(transaction, aUser)
    }
}

addAllNewTransactions(newTransactions, user)
console.log(user);

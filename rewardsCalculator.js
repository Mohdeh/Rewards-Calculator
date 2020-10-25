/* A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
A customer receives 2 points for every dollar spent over $100 in each transaction,
plus 1 point for every dollar spent over $50 in each transaction
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
Given a record of every transaction during a three month period,
calculate the reward points earned for each customer per month and total. */

function rewardsCalculator(price) {
    if (price >=50 && price <= 100) {
        return price-50;
    } else if (price >100){
        return (50 + 2*(price-100));
    }
    return 0;
}


class Record {
    constructor(price) {
        this.price = price;
        this.rewards = rewardsCalculator(price);
        this.transactionDate = new Date();
    }
}

class RecordList {
    constructor() {
        this.list = [];
    }

    getLast3MonthsRecords() {
        var today = new Date();
        const threeOldDate = today.setMonth(today.getMonth() - 3);
        let filteredList = this.list.filter(trans => trans.transactionDate > threeOldDate);
        return filteredList.sort((a,b) => b.transactionDate - a.transactionDate);
    }

    getAllRecords() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    addRecord(price) {
        const record = new Record(price);
        this.list.push(record);
    }

    getTotalRewards() {
        return this.list.length ? this.list.reduce((acc, key)=>acc + key.rewards, 0) : 0;
    }

    rewardPerMonth() {
        let last3MonthRewards = [];
        for(let i=0; i<3; i++) {
            let filteredList = this.list.filter(trans => trans.transactionDate.getMonth() == (new Date).getMonth() - i );
            last3MonthRewards[i] = filteredList.reduce((acc,key)=>acc + key.rewards,0);
        }
        return last3MonthRewards;
    }
}


let testRecordsList = new RecordList();
testRecordsList.addRecord(74);
testRecordsList.addRecord(173);
testRecordsList.addRecord(40);
testRecordsList.addRecord(222);
testRecordsList.addRecord(400);
testRecordsList.addRecord(550);
let arr = testRecordsList.getAllRecords();

for (let i=0; i<arr.length; i++) {
    console.log(arr[i]);
}

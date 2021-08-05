'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};
const getAllItems = () =>{
    const dataAccessMethod = () => {
        let itemSet = new Set();
        _.map(db.itemsOfUserByUsername, (itemList) => {
            itemList.forEach(item => {
                itemSet.add(item);
            })
        })

        return Array.from(itemSet);
    }
    return mockDBCall(dataAccessMethod);
}

const getUsersByItem = (item) =>{
    let users = [];
    _.map(db.itemsOfUserByUsername, (itemList, user) =>{
        if(itemList.indexOf(item) > -1) users.push(user);
    })
    return users;
}

const getAgeListByUsers = (users) =>{
    let ageCountList = []; // this is the result array
    let ageList = []; // this is used to replace users array with their age like ['John', 'Paul', 'Erica'] -> [18,29,90]
    _.map(db.usersById, userInfo =>{
        if (users.includes(userInfo.username)){
            ageList.push(userInfo.age);
        }
    });
    let map = new Map();
    ageList.forEach(age =>{
        if(map.has(age)){
            let currentAge = map.get(age);
            map.set(age, currentAge+1);
        }
        else{
            map.set(age, 1);
        }
    })
    map.forEach((value,key)=>{
        ageCountList.push(new Object({age:key, count:value}));
    })

    // console.log(ageCountList);
    return ageCountList;

}

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
    const users = getUsersByItem(item);
    return getAgeListByUsers(users);


    }
    return mockDBCall(dataAccessMethod);
}



module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getAllItems
};

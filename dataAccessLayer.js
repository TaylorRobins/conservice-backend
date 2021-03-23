const {query} = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const url = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE;

const collectionName = "employees";
const settings = {
    useUnifiedTopology: true,
};

let databaseClient;
let employeeCollection;

//connect to database

const connect = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, (error, client) => {
            if (error) {
                console.log(error);
                reject(error);
                return
            }

            databaseClient = client.db(databaseName);
            employeeCollection = databaseClient.collection(collectionName);
            console.log("SUCCESSFULLY CONNECTED TO DATABASE");
            resolve();
        });
    });
};

//INSERT ONE DOCUMENT
const insertOne = function(employee) {
    return new Promise((resolve,reject) =>{
        employeeCollection.insertOne(employee, (error, result) => {
            if(error) {
                console.log(error);
                reject(error);
            }
            console.log("SUCCESSFULLY INSERTED A NEW DOCUMENT")
            resolve();
        });
    });
};

//FIND ALL DOCUMENTS

const findAll = function () {
    const query = {};

    return new Promise((resolve,reject) => {
        employeeCollection.find(query).toArray((error, documents) => {
            if(error) {
                console.log(error);
                reject(error);
                return;
            }

            console.log(`SUCCESSFULLY FOUND ${documents.length} DOCUMENTS`);
            resolve(documents);
        });
    });
};

//FIND ONE DOCUMENT
const findOne = function(query) {
    return new Promise((resolve,reject) => {
        employeeCollection.find(query).toArray((error, documents) => {
            if(error) {
                console.log(error);
                reject(error);
                return;
            }

            if (documents.length >0) {
                console.log("SUCCESSFULLY FOUND DOCUMENT");
                const document = documents[0];
                resolve(document);
            } else {
                reject("NO DOCUMENT FOUND");
            }
        });
    });
};
//UPDATE ONE DOCUMENT

const updateOne = function (query, newEmployee) {
    const newEmployeeQuery = {};

    if (newEmployee.name) {
        newEmployeeQuery.name = newEmployee.name;
    }

    if (newEmployee.address) {
        newEmployeeQuery.address = newEmployee.address;
    }

    if (newEmployee.email) {
        newEmployeeQuery.email = newEmployee.email;
    }

    if (newEmployee.phone) {
        newEmployeeQuery.phone = newEmployee.phone;
    }

    if (newEmployee.position) {
        newEmployeeQuery.position = newEmployee.position;
    }

    if (newEmployee.department) {
        newEmployeeQuery.department = newEmployee.department;
    }

    if (newEmployee.start) {
        newEmployeeQuery.start = newEmployee.start;
    }

    if (newEmployee.end) {
        newEmployeeQuery.end = newEmployee.end;
    }

    if (newEmployee.status) {
        newEmployeeQuery.status = newEmployee.status;
    }

    if (newEmployee.shift) {
        newEmployeeQuery.shift = newEmployee.shift;
    }

    if (newEmployee.manager) {
        newEmployeeQuery.manager = newEmployee.manager;
    }

    if (newEmployee.color) {
        newEmployeeQuery.color = newEmployee.color;
    }

    console.log(query);

    return new Promise((resolve, reject) => {
        employeeCollection.updateOne(query, 
            { $set: newEmployeeQuery}, 
            (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    return;
                } else if (result.modifiedCount === 0) {
                    console.log("NO DOCUMENT FOUND");
                    reject("NO DOCUMENT FOUND");
                    return;
                }
                console.log("SUCCESSFULLY UPDATED DOCUMENT")
                resolve();
            }
        );
    });
};

//DELETE ONE DOCUMENT

const deleteOne = function(query) {
    return new Promise((resolve,reject) => {
        employeeCollection.deleteOne(query, (error, result) => {
            if(error) {
                console.log(error);
                reject(error);
                return;
            } else if (result.deletedCount === 0) {
                console.log("NO DOCUMENT FOUND");
                reject("NO DOCUMENT FOUND");
                return;
            }
            console.log("SUCCESSFULLY DELETED DOCUMENT");
            resolve();
        });
    });
};

// CommonJS Export
module.exports = { connect, insertOne, findAll, findOne, updateOne, deleteOne };

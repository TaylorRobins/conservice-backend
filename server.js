const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const dataAccessLayer = require("./dataAccessLayer");
const {request} = require("http");
const {response} = require("express");
const {ObjectId, ObjectID} = require("mongodb");
dataAccessLayer.connect();

const app = express();
//installing cors middleware allows server to respond to requests from a different origin
app.use(cors());
app.use(bodyParser.json());

let employees = [];

try {
    employees = JSON.parse(fs.readFileSync("employees.json")).employees;
} catch (error) {
    console.log("NO EXISTING FILE");
}

app.get("/api/employees/:id", async (request, response) => {
    const employeeId = request.params.id;

    if(!ObjectID.isValid(employeeId)) {
        response.status(400).send(`EmployeeID ${employeeId} is incorrect.`);
        return;
    }
    const employeeQuery = {
        _id: new ObjectId(employeeId),
    };
    let employee;
    try {
        employee = await dataAccessLayer.findOne(employeeQuery);
    } catch (error) {
        response.status(404).send(`Employee with id ${employeeId} not found!`);
        return;
    }

    response.send(employee);
});

app.get("/api/employees", async (request, response) => {
    const employees = await dataAccessLayer.findAll();

    response.send(employees);
});

app.post("/api/employees", async (request, response) => {
    const body = request.body;

    if (!body.name || !body.address || !body.email || !body.phone || !body.position || !body.department || !body.startDate || !body.endDate || !body.employmentStatus || !body.shift || !body.manager || !body.teamMemberPhoto || !body.favoriteColor) {
        response
            .status(400)
            .send("Bad Request. Validation Error. Missing name, address, email, phone number, position, department, start date, end date, employment status, shift, manager, team member photo, or favorite color.");
        return;
    }

    if(typeof body.name !== "string") {
        response.status(400).send("The name parameter must be of type string")
        return;
    }

    if(typeof body.address !== "string") {
        response.status(400).send("The address parameter must be of type string")
        return;
    }

    if(typeof body.email !== "string") {
        response.status(400).send("The email parameter must be of type string")
        return;
    }

    if(typeof body.phone !== "string") {
        response.status(400).send("The phone parameter must be of type string")
        return;
    }

    if(typeof body.position !== "string") {
        response.status(400).send("The position parameter must be of type string")
        return;
    }

    if(typeof body.department !== "string") {
        response.status(400).send("The department parameter must be of type string")
        return;
    }

    if(typeof body.startDate !== "number") {
        response.status(400).send("The start date parameter must be of type number")
        return;
    }

    if(typeof body.endDate !== "number") {
        response.status(400).send("The end date parameter must be of type number")
        return;
    }

    if(typeof body.employmentStatus !== "string") {
        response.status(400).send("The employment status parameter must be of type string")
        return;
    }

    if(typeof body.shift !== "string") {
        response.status(400).send("The shift parameter must be of type string")
        return;
    }

    if(typeof body.manager !== "string") {
        response.status(400).send("The manager parameter must be of type string")
        return;
    }

    if(typeof body.teamMemberPhoto !== "string") {
        response.status(400).send("The team member photo parameter must be of type string")
        return;
    }

    if(typeof body.favoriteColor !== "string") {
        response.status(400).send("The favorite color parameter must be of type string")
        return;
    }

    await dataAccessLayer.insertOne(body);

    response.status(201).send();
});

app.put("/api/employees/:id", async (request, response) => {
    const employeeId = request.params.id;
    const body = request.body;

    if(!ObjectId.isValid(employeeId)) {
        response.status(400).send(`EmployeeID ${employeeId} is incorrect`);
        return;
    }

    if (body.name && typeof body.name !== "string") {
        response.status(400).send("The name parameter must be of type string.");
        return;
    }

    if (body.address && typeof body.address !== "string") {
        response.status(400).send("The address parameter must be of type string.");
        return;
    }

    if (body.email && typeof body.email !== "string") {
        response.status(400).send("The email parameter must be of type string.");
        return;
    }

    if (body.phone && typeof body.phone !== "string") {
        response.status(400).send("The phone parameter must be of type string.");
        return;
    }

    if (body.position && typeof body.position !== "string") {
        response.status(400).send("The position parameter must be of type string.");
        return;
    }

    if (body.department && typeof body.department !== "string") {
        response.status(400).send("The department parameter must be of type string.");
        return;
    }

    if (body.startDate && isNaN(Number(body.startDate))) {
        response.status(400).send("The start date parameter must be of type number.");
        return;
    }

    if (body.endDate && isNaN(Number(body.endDate))) {
        response.status(400).send("The end date parameter must be of type number.");
        return;
    }

    if (body.employmentStatus && typeof body.employmentStatus !== "string") {
        response.status(400).send("The employment status parameter must be of type string.");
        return;
    }

    if (body.shift && typeof body.shift !== "string") {
        response.status(400).send("The shift parameter must be of type string.");
        return;
    }

    if (body.manager && typeof body.manager !== "string") {
        response.status(400).send("The manager parameter must be of type string.");
        return;
    }

    if (body.teamMemberPhoto && typeof body.teamMemberPhoto !== "string") {
        response.status(400).send("The team member photo parameter must be of type string.");
        return;
    }

    if (body.favoriteColor && typeof body.favoriteColor !== "string") {
        response.status(400).send("The favorite color parameter must be of type string.");
        return;
    }

    const employeeQuery = {
        _id: new ObjectId(employeeId),
    };

    try {
        await dataAccessLayer.updateOne(employeeQuery, body);
    } catch (error) {
        response.status(404).send(`Employee with id ${employeeId} not found!`);
        return;
    }

    response.send();
});

app.delete("/api/employees/:id", async (request, response) => {
    const employeeId = request.params.id;

    if (!ObjectId.isValid(employeeId)) {
        response.status(400).send(`EmployeeID ${employeeId} is incorrect.`);
        return;
    }

    const employeeQuery = {
        _id: new ObjectId(employeeId)
    };

    try {
        await dataAccessLayer.deleteOne(employeeQuery);
    } catch(error) {
        response.status(400).send(`Employee with id ${employeeId} not found!`);
        return;
    }

    response.send();
});

const port = process.env.PORT ? process.env.PORT : 3005;
app.listen(port, () => {
    console.log("Employee API Server Started");
});
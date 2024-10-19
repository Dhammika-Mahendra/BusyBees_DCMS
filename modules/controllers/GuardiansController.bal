import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER = "aadf73_bsybdb";
const PASSWORD = "busybeedb123";
const HOST = "mysql8002.site4now.net";
const PORT = 3306;
const DATABASE = "db_aadf73_bsybdb";

final mysql:Client dbClient4 = check new(
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = DATABASE
);


public function getAllGuardian(http:Caller caller, http:Request req) returns error? {
    types:Guardian[] guardiansData = [];

    do {
        stream<types:Guardian, error?> resultStream = dbClient4->query(`SELECT * FROM guardians`);
        check from types:Guardian gr in resultStream
            do {
                guardiansData.push(gr);
            };
        check resultStream.close();

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload(guardiansData.toJson()); // Convert to JSON
        check caller->respond(res);
    } on fail var e {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload("Error occurred while fetching data from the database: " + e.message());
        check caller->respond(res);
    }
}


public function createGuardian(http:Caller caller, http:Request req) returns error? {
    json payload=check req.getJsonPayload();
    types:Guardian newGuardian=check payload.cloneWithType(types:Guardian);
    do {
        sql:ExecutionResult result = check dbClient4->execute(`INSERT INTO guardians (address, email,first_name, last_name, phone_number) VALUES (${newGuardian.address}, ${newGuardian.email}, ${newGuardian.first_name}, ${newGuardian.last_name}, ${newGuardian.phone_number})`);
        if(result.affectedRowCount==0){
            check caller->respond("Error occurred while inserting data into the database: No rows affected");
        }else{
            json response = { "message": "Guardian created successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while inserting data into the database: " + e.message());
    }
}

public function updateGuardian(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");
    json payload = check req.getJsonPayload();
    types:Guardian updatedGuardian = check payload.cloneWithType(types:Guardian);
    do {   
        sql:ExecutionResult result = check dbClient4->execute(`UPDATE guardians SET address = ${updatedGuardian.address}, email = ${updatedGuardian.email}, first_name = ${updatedGuardian.first_name} , last_name = ${updatedGuardian.last_name}, phone_number = ${updatedGuardian.phone_number}WHERE id = ${id}`);     
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No guardian found with the provided id to update." });
        } else {
            json response = { "message": "Guardians updated successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        
        check caller->respond("Error occurred while updating the guardians: " + e.message());
    }
}


public function deleteGuardian(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");

    if id is () {
        check caller->respond("Error: Guardian ID not provided.");
        return;
    }

    do {
        sql:ExecutionResult result = check dbClient4->execute(`DELETE FROM guardians WHERE id = ${id}`);
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No guardian found with the provided id to delete." });
        } else {
            json response = { "message": "Guardian deleted successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while deleting the guardian: " + e.message());
    }
}


public function getGuardianById(http:Caller caller, http:Request req) returns error? {
    types:Guardian? guardian = ();
    string? guardianId = req.getQueryParamValue("guardianId");

    if guardianId is () {
        check caller->respond("Guardian ID not provided.");
        return;
    }

    do {
        stream<types:Guardian, error?> resultStream = dbClient4->query(
            `SELECT * FROM guardians WHERE id = ${guardianId}`
        );
        check from types:Guardian gr in resultStream
            do {
                guardian = gr;
            };

        check resultStream.close();

        if guardian is () {
            check caller->respond("Guardian not found for the given ID: " + guardianId.toString());
        } else {
            check caller->respond(guardian);
        }
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}
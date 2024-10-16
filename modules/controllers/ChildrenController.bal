import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER="aadf73_bsybdb";
const PASSWORD="busybeedb123";
const HOST="mysql8002.site4now.net";
const PORT=3306;
const DATABASE="db_aadf73_bsybdb";

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);


public function handleGreet(http:Caller caller, http:Request req) returns error? {
    check caller->respond("Hello from greet controller!");
}

public function getAllChildren(http:Caller caller, http:Request req) returns error? {
    types:Children[] childrenData = [];

    do {
        stream<types:Children, error?> resultStream = dbClient->query(`SELECT * FROM children`);
        check from types:Children ch in resultStream
            do {
                childrenData.push(ch);
            };
        check resultStream.close();

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload(childrenData.toJson()); // Convert to JSON
        check caller->respond(res);
    } on fail var e {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload("Error occurred while fetching data from the database: " + e.message());
        check caller->respond(res);
    }
}

public function getChildById(http:Caller caller, http:Request req) returns error? {
    types:Children? child = ();
    string? childId = req.getQueryParamValue("childId");

    do {
        stream<types:Children, error?> resultStream = dbClient->query(
            `SELECT * FROM children WHERE id = ${childId}`
        );
        check from types:Children ch in resultStream
            do {
                child = ch;
            };

        check resultStream.close();

        if child is () {
            // No child found, respond with 404
            check caller->respond("Child not found for the given ID: " + childId.toString());
        } else {
            // Child found, respond with data
            check caller->respond(child);
        }
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}


//Dilum addded cors
public function createChildren(http:Caller caller, http:Request req) returns error? {
    json payload = check req.getJsonPayload();
    types:Children newChildren = check payload.cloneWithType(types:Children);
    do {
        sql:ExecutionResult result = check dbClient->execute(`INSERT INTO children (address, dob, first_name, last_name, guardian_id) VALUES (${newChildren.address}, ${newChildren.dob}, ${newChildren.first_name}, ${newChildren.last_name}, ${newChildren.guardian_id})`);
        
        // Prepare the response with CORS headers
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        res.setPayload({ "status": "success", "message": "Child created successfully" });
        check caller->respond(res);
    } on fail var e {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        res.setPayload({ "status": "error", "message": "Error creating child: " + e.message() });
        check caller->respond(res);
    }
}




public function updateChildren(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("childId");
    json payload = check req.getJsonPayload();
    types:Children updatedChildren = check payload.cloneWithType(types:Children);
    do {   
        sql:ExecutionResult result = check dbClient->execute(`UPDATE children SET address = ${updatedChildren.address}, dob = ${updatedChildren.dob}, first_name = ${updatedChildren.first_name}, last_name = ${updatedChildren.last_name}, guardian_id = ${updatedChildren.guardian_id} WHERE id = ${id}`);     
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No children found with the provided id to update." });
        } else {
            json response = { "message": "Children updated successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        
        check caller->respond("Error occurred while updating the children: " + e.message());
    }
}

    public function deleteChildren(http:Caller caller, http:Request req) returns error? {
        string? id = req.getQueryParamValue("childId");

        if id is () {
            http:Response res = new;
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            res.setPayload("Error: Children id not provided.");
            check caller->respond(res);
            return;
        }

        do {
            sql:ExecutionResult result = check dbClient->execute(`DELETE FROM children WHERE id = ${id}`);
            http:Response res = new;
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            if (result.affectedRowCount == 0) {
                res.setPayload({ "message": "No children found with the provided id to delete." });
                check caller->respond(res);
            } else {
                json response = { "message": "Children deleted successfully!" };
                res.setPayload(response);
                check caller->respond(res);
            }
        } on fail var e {
            http:Response res = new;
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            res.setPayload("Error occurred while deleting the children: " + e.message());
            check caller->respond(res);
        }
    }
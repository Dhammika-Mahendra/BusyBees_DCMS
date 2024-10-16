import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER="aadf73_bsybdb";
const PASSWORD="busybeedb123";
const HOST="mysql8002.site4now.net";
const PORT=3306;
const DATABASE="db_aadf73_bsybdb";

final mysql:Client dbClient3 = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

public function getAllClassRoom(http:Caller caller, http:Request req) returns error? {
    types:Classroom[] classRoomData = [];

    do {
        stream<types:Classroom, error?> resultStream = dbClient3->query(`SELECT * FROM classrooms`);
        check from types:Classroom cr in resultStream
            do {
                classRoomData.push(cr);
            };
        check resultStream.close();

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload(classRoomData.toJson()); // Convert to JSON
        check caller->respond(res);
    } on fail var e {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        res.setPayload("Error occurred while fetching data from the database: " + e.message());
        check caller->respond(res);
    }
}

public function createClassRoom(http:Caller caller, http:Request req) returns error? {
    json payload=check req.getJsonPayload();
    types:Classroom newClassroom=check payload.cloneWithType(types:Classroom);
    do {
        sql:ExecutionResult result = check dbClient3->execute(`INSERT INTO classrooms (age_group, class_name,last_Updated) VALUES (${newClassroom.age_group}, ${newClassroom.class_name}, ${newClassroom.last_updated})`);
        if(result.affectedRowCount==0){
            check caller->respond("Error occurred while inserting data into the database: No rows affected");
        }else{
            json response = { "message": "Classroom created successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while inserting data into the database: " + e.message());
    }
}
public function updateClassRoom(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");
    json payload = check req.getJsonPayload();
    types:Classroom updatedClassroom = check payload.cloneWithType(types:Classroom);
    do {   
        sql:ExecutionResult result = check dbClient3->execute(`UPDATE classrooms SET age_group = ${updatedClassroom.age_group}, class_name = ${updatedClassroom.class_name}, last_Updated = ${updatedClassroom.last_updated} WHERE id = ${id}`);     
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No classroom found with the provided id to update." });
        } else {
            json response = { "message": "Classroom updated successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        
        check caller->respond("Error occurred while updating the classroom: " + e.message());
    }
}

public function deleteClassRoom(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");

    if id is () {
        check caller->respond("Error: Classroom id not provided.");
        return;
    }

    do {
        sql:ExecutionResult result = check dbClient3->execute(`DELETE FROM classrooms WHERE id = ${id}`);
        
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No classroom found with the provided id to delete." });
        } else {
            json response = { "message": "Classroom deleted successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while deleting the classroom: " + e.message());
    }
}

public function getClassRoomById(http:Caller caller, http:Request req) returns error? {
    types:Classroom? classroom = ();
    string? classId = req.getQueryParamValue("classId");

    if classId is () {
        check caller->respond("Classroom ID not provided.");
        return;
    }

    do {
        stream<types:Classroom, error?> resultStream = dbClient3->query(
            `SELECT * FROM classrooms WHERE id = ${classId}`
        );
        check from types:Classroom cr in resultStream
            do {
                classroom = cr;
            };

        check resultStream.close();

        if classroom is () {
            check caller->respond("Classroom not found for the given ID: " + classId.toString());
        } else {
            check caller->respond(classroom);
        }
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}

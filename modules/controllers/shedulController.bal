import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER = "aadf73_bsybdb";
const PASSWORD = "busybeedb123";
const HOST = "mysql8002.site4now.net";
const PORT = 3306;
const DATABASE = "db_aadf73_bsybdb";

final mysql:Client dbClient7 = check new(
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = DATABASE
);


public function getAllSchedule(http:Caller caller, http:Request req) returns error? {
    types:Schedule[] schedulesData = [];

    do {
        stream<types:Schedule, error?> resultStream = dbClient7->query(`SELECT * FROM schedules`);
        check from types:Schedule sd in resultStream
            do {
                schedulesData.push(sd);
            };
        check resultStream.close();
        check caller->respond(schedulesData);
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}


public function createSchedule(http:Caller caller, http:Request req) returns error? {
    json payload=check req.getJsonPayload();
    types:Schedule newSchedule=check payload.cloneWithType(types:Schedule);
    do {
        sql:ExecutionResult result = check dbClient7->execute(`INSERT INTO schedules (date, end_time,start_time, staff_id, child_id, classroom_id) VALUES (${newSchedule.date}, ${newSchedule.end_time}, ${newSchedule.start_time}, ${newSchedule.staff_id}, ${newSchedule.child_id}, ${newSchedule.classroom_id})`);
        if(result.affectedRowCount==0){
            check caller->respond("Error occurred while inserting data into the database: No rows affected");
        }else{
            json response = { "message": "Schedule created successdully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while inserting data into the database: " + e.message());
    }
}

public function updateSchedule(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");
    json payload = check req.getJsonPayload();
    types:Schedule updatedSchedule = check payload.cloneWithType(types:Schedule);
    do {   
        sql:ExecutionResult result = check dbClient7->execute(`UPDATE schedules SET date = ${updatedSchedule.date}, end_time = ${updatedSchedule.end_time}, start_time = ${updatedSchedule.start_time} , staff_id = ${updatedSchedule.staff_id}, child_id = ${updatedSchedule.child_id}, classroom_id = ${updatedSchedule.classroom_id}WHERE id = ${id}`);     
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No schedule found with the provided id to update." });
        } else {
            json response = { "message": "Schedules updated successdully!" };
            check caller->respond(response);
        }
    } on fail var e {
        
        check caller->respond("Error occurred while updating the schedules: " + e.message());
    }
}


public function deleteSchedule(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");

    if id is () {
        check caller->respond("Error: Schedule ID not provided.");
        return;
    }

    do {
        sql:ExecutionResult result = check dbClient7->execute(`DELETE FROM schedules WHERE id = ${id}`);
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No schedule found with the provided id to delete." });
        } else {
            json response = { "message": "Schedule deleted successdully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while deleting the schedule: " + e.message());
    }
}


public function getScheduleById(http:Caller caller, http:Request req) returns error? {
    types:Schedule? schedule = ();
    string? scheduleId = req.getQueryParamValue("scheduleId");

    if scheduleId is () {
        check caller->respond("Schedule ID not provided.");
        return;
    }

    do {
        stream<types:Schedule, error?> resultStream = dbClient7->query(
            `SELECT * FROM schedules WHERE id = ${scheduleId}`
        );
        check from types:Schedule sd in resultStream
            do {
                schedule = sd;
            };

        check resultStream.close();

        if schedule is () {
            check caller->respond("Schedule not found for the given ID: " + scheduleId.toString());
        } else {
            check caller->respond(schedule);
        }
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}

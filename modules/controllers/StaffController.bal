import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER = "aadf73_bsybdb";
const PASSWORD = "busybeedb123";
const HOST = "mysql8002.site4now.net";
const PORT = 3306;
const DATABASE = "db_aadf73_bsybdb";

final mysql:Client dbClient6 = check new(
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = DATABASE
);

//==================================================================================
//                  Get All Staff
//==================================================================================

public function getAllStaff(http:Caller caller, http:Request req) returns error? {
    types:Staff[] staffsData = [];

    do {
        stream<types:Staff, error?> resultStream = dbClient6->query(`SELECT * FROM staffs`);
        check from types:Staff sf in resultStream
            do {
                staffsData.push(sf);
            };
        check resultStream.close();
        check caller->respond(staffsData);
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}

//==================================================================================
//                  Create Staff
//==================================================================================

public function createStaff(http:Caller caller, http:Request req) returns error? {
    json payload = check req.getJsonPayload();
    types:Staff newStaff = check payload.cloneWithType(types:Staff);
    
    do {
        sql:ExecutionResult result = check dbClient6->execute(
            `INSERT INTO staffs (email, first_name, last_name, phone_number, role, password) 
             VALUES (${newStaff.email}, ${newStaff.first_name}, ${newStaff.last_name}, ${newStaff.phone_number}, ${newStaff.role}, ${newStaff.password})`
        );

        if (result.affectedRowCount == 0) {
            check caller->respond("Error occurred while inserting data into the database: No rows affected");
        } else {
            json response = { "message": "Staff created successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while inserting data into the database: " + e.message());
    }
}

//==================================================================================
//                  Update Staff
//==================================================================================
public function updateStaff(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");
    json payload = check req.getJsonPayload();
    types:Staff updatedStaff = check payload.cloneWithType(types:Staff);
    
    do {   
        sql:ExecutionResult result = check dbClient6->execute(
            `UPDATE staffs 
             SET email = ${updatedStaff.email}, 
                 first_name = ${updatedStaff.first_name}, 
                 last_name = ${updatedStaff.last_name}, 
                 phone_number = ${updatedStaff.phone_number}, 
                 role = ${updatedStaff.role}, 
                 password = ${updatedStaff.password} -- Update password if provided
             WHERE id = ${id}`
        );

        if (result.affectedRowCount == 0) {
            check caller->respond({ "message": "No staff found with the provided id to update." });
        } else {
            json response = { "message": "Staff updated successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while updating the staff: " + e.message());
    }
}


//==================================================================================
//                  Delete Staff
//==================================================================================

public function deleteStaff(http:Caller caller, http:Request req) returns error? {
    string? id = req.getQueryParamValue("id");

    if id is () {
        check caller->respond("Error: Staff ID not provided.");
        return;
    }

    do {
        sql:ExecutionResult result = check dbClient6->execute(`DELETE FROM staffs WHERE id = ${id}`);
        if result.affectedRowCount == 0 {
            check caller->respond({ "message": "No staff found with the provided id to delete." });
        } else {
            json response = { "message": "Staff deleted successfully!" };
            check caller->respond(response);
        }
    } on fail var e {
        check caller->respond("Error occurred while deleting the staff: " + e.message());
    }
}

//==================================================================================
//                  Get Staff By ID
//==================================================================================

public function getStaffById(http:Caller caller, http:Request req) returns error? {
    types:Staff? staff = ();
    string? staffId = req.getQueryParamValue("staffId");

    if staffId is () {
        check caller->respond("Staff ID not provided.");
        return;
    }

    do {
        stream<types:Staff, error?> resultStream = dbClient6->query(
            `SELECT * FROM staffs WHERE id = ${staffId}`
        );
        check from types:Staff sf in resultStream
            do {
                staff = sf;
            };

        check resultStream.close();

        if staff is () {
            check caller->respond("Staff not found for the given ID: " + staffId.toString());
        } else {
            check caller->respond(staff);
        }
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}

//==================================================================================
//                  Staff Resource
//==================================================================================

// service /staff on new http:Listener(8080) {
//     resource function post staff(http:Caller caller, http:Request req) returns error? {
//         check createStaff(caller, req);
//     }
// }

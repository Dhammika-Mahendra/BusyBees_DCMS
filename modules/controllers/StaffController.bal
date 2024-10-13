import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import BusyBees_DCMS.types;

const USER="aadf73_bsybdb";
const PASSWORD="busybeedb123";
const HOST="mysql8002.site4now.net";
const PORT=3306;
const DATABASE="db_aadf73_bsybdb";

final mysql:Client dbClient2 = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);


// Get all Staff
# Description.
#
# + caller - parameter description  
# + req - parameter description
# + return - return value description
public function getAllStaff(http:Caller caller, http:Request req) returns error? {
    types:Staff[] staffData = [];
    do {
        stream<types:Staff, error?> resultStream = dbClient2->query(`SELECT * FROM staffs`);
        check from types:Staff staff in resultStream
            do {
                staffData.push(staff);
            };
        check resultStream.close();
        check caller->respond(staffData);
    } on fail var e {
        check caller->respond("Error occurred while fetching data from the database: " + e.message());
    }
}
public function updateStaff(http:Caller caller, http:Request req, string id) returns error? {
    types:Staff updatedStaff;
    
    // Get the JSON payload from the request
    json reqPayload = check req.getJsonPayload();
    
    // Attempt to clone the JSON into the Staff type, but allow missing fields
    updatedStaff = check reqPayload.cloneWithType(types:Staff);

    // Correct SQL query and parameterized query usage
    string query = "UPDATE Staff SET first_name = ?, last_name = ?, phone_number = ?, role = ? WHERE id = ?";
    sql:ParameterizedQuery paramQuery = `UPDATE Staff SET first_name = ${updatedStaff.firstName}, 
                                          last_name = ${updatedStaff.lastName}, 
                                          phone_number = ${updatedStaff.phoneNumber}, 
                                          role = ${updatedStaff.role} WHERE id = ${id}`;
    var result = dbClient2->execute(paramQuery);

    if (result is sql:ExecutionResult) {
        check caller->respond("Staff record updated successfully.");
    } else {
        check caller->respond("Failed to update the staff record.");
    }
}
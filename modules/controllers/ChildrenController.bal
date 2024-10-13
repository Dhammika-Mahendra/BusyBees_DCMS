import ballerina/http;
import BusyBees_DCMS.types;
import ballerinax/mysql;

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

public function getAllChidren(http:Caller caller, http:Request req) returns error? {
        types:Children[] childrenData=[];

        do {
	        stream<types:Children, error?> resultStream =dbClient->query(`SELECT * FROM children`);
            check from types:Children ch in resultStream
                do {
                    childrenData.push(ch);
                };
            check resultStream.close();
            check caller->respond(childrenData);
        } on fail var e {
        	check caller->respond("Error occurred while fetching data from the database: " + e.message());
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

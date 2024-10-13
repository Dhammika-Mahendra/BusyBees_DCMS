import ballerina/http;
import ballerinax/mysql;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

service /crud on new http:Listener(8080) {

    //getting the all employees
	resource function get ch() returns Children[]|error {
            Children[] childrenData=[];
            do {
	            stream<Children, error?> resultStream =dbClient->query(`SELECT * FROM children`);
                check from Children ch in resultStream
                    do {
                        childrenData.push(ch);
                    };
                check resultStream.close();
                return childrenData;
            } on fail var e {
            	return e;
            }
    }

}

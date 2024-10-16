import BusyBees_DCMS.types;
import ballerinax/mysql;
import ballerina/sql;

const USER = "aadf73_bsybdb";
const PASSWORD = "busybeedb123";
const HOST = "mysql8002.site4now.net";
const PORT = 3306;
const DATABASE = "db_aadf73_bsybdb";

final mysql:Client dbClient0 = check new(
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = DATABASE
);


public function register(types:Auth authdata) returns string?{
    types:Auth newAuth=authdata;

    //Check if the email already exists......................................

    types:Auth? ath;
    do {
        stream<types:Auth, error?> resultStream = dbClient6->query(
            `SELECT * FROM auth WHERE email = ${newAuth.email}`
        );
        check from types:Auth a in resultStream
            do {
                ath=a;
            };
        check resultStream.close();
        if ath is () {
            return "Exist";
        } else {
    

            //Insert the new user & password.........................................
            do {
                sql:ExecutionResult result = check dbClient6->execute(`INSERT INTO auth (email,password) VALUES ($      {newAuth.email}, ${newAuth.password})`);
                if(result.affectedRowCount==0){
                    return "Error";
                }else{
                    return "OK";
                }
                } on fail {
                    return "Error";
                }
        
        }
    } on fail {
        return "Error";
    }

}


public function login(types:Auth authdata) returns string?{
    types:Auth newAuth=authdata;

    //Check if the email already exists......................................

    types:Auth? ath;
    do {
        stream<types:Auth, error?> resultStream = dbClient6->query(
            `SELECT * FROM auth WHERE email = ${newAuth.email}`
        );
        check from types:Auth a in resultStream
            do {
                ath=a;
            };
        check resultStream.close();
        if ath is () {
            return "Not Exist";
        } else {
            if(ath.password==newAuth.password){
                return "OK";
            }else{
                return "Incorrect";
            }
        }
    } on fail {
        return "Error";
    }

}
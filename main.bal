import ballerina/http;
import BusyBees_DCMS.controllers;

service / on new http:Listener(8080) {

    // Hello function
    resource function get hello(http:Caller caller, http:Request req) returns error? {
        check caller->respond("Hello from main service!");
    }

    //==================================================================================
    //                  Children
    //==================================================================================

    // Get all children function
    resource function get children(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllChidren(caller, req);
    }
    
    resource function get child(http:Caller caller, http:Request req) returns error? {
        check controllers:getChildById(caller, req);
    }


    //==================================================================================
    //                  Staff
    //==================================================================================

    // Get all staff function
    resource function get staff(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllStaff(caller, req);
    }

    // Update staff function - HTTP PUT
    resource function put staff/[string id](http:Caller caller, http:Request req) returns error? {
        check controllers:updateStaff(caller, req, id);
    }


    //==================================================================================
    //                  Classroom
    //==================================================================================

    resource function get classRoom(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllClassRoom(caller, req);
    }

    resource function post classRoom(http:Caller caller, http:Request req) returns error? {
        check controllers:createClassRoom(caller, req);
    }

    resource function put classRoom(http:Caller caller, http:Request req) returns error? {
        check controllers:updateClassRoom(caller, req);
    }

  resource function delete classRoom(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteClassRoom(caller, req);
    }

    //==================================================================================
    //                  Guardian
    //==================================================================================

    
    
    //==================================================================================
    //                  Schedule
    //==================================================================================
}

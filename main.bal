import ballerina/http;
import BusyBees_DCMS.controllers;
    @http:ServiceConfig {
        cors: {
            allowOrigins: ["http://localhost:5173"]
        }
    }
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
        check controllers:getAllChildren(caller, req);
    }
    
    resource function get child(http:Caller caller, http:Request req) returns error? {
        check controllers:getChildById(caller, req);
    }

    resource function post child(http:Caller caller, http:Request req) returns error? {
        check controllers:createChildren(caller, req);
    }

    resource function put child(http:Caller caller, http:Request req) returns error? {
        check controllers:updateChildren(caller, req);
    }

    resource function delete child(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteChildren(caller, req);
    }


    //==================================================================================
    //                  Staff
    //==================================================================================
 resource function get staff(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllStaff(caller, req);
    }
    
    resource function get staffById(http:Caller caller, http:Request req) returns error? {
        check controllers:getStaffById(caller, req);
    }

    resource function post staff(http:Caller caller, http:Request req) returns error? {
        check controllers:createStaff(caller, req);
    }

    resource function put staff(http:Caller caller, http:Request req) returns error? {
        check controllers:updateStaff(caller, req);
    }

    resource function delete staff(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteStaff(caller, req);
    }
    //==================================================================================
    //                  Classroom
    //==================================================================================

    resource function get classRoom(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllClassRoom(caller, req);
    }

 resource function get ClassRoomById(http:Caller caller, http:Request req) returns error? {
        check controllers:getClassRoomById(caller, req);
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

        resource function get guardian(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllGuardian(caller, req);
    }

 resource function get GuardianById(http:Caller caller, http:Request req) returns error? {
        check controllers:getGuardianById(caller, req);
    }

    resource function post guardian(http:Caller caller, http:Request req) returns error? {
        check controllers:createGuardian(caller, req);
    }

    resource function put guardian(http:Caller caller, http:Request req) returns error? {
        check controllers:updateGuardian(caller, req);
    }

    resource function delete Guardian(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteGuardian(caller, req);
    }
    
    //==================================================================================
    //                  Schedule
    //==================================================================================
    
        resource function get schedule(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllSchedule(caller, req);
    }

 resource function get scheduleById(http:Caller caller, http:Request req) returns error? {
        check controllers:getScheduleById(caller, req);
    }

    resource function post schedule(http:Caller caller, http:Request req) returns error? {
        check controllers:createSchedule(caller, req);
    }

    resource function put schedule(http:Caller caller, http:Request req) returns error? {
        check controllers:updateSchedule(caller, req);
    }

    resource function delete schedule(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteSchedule(caller, req);
    }
    
    //==================================================================================
    //                  Auth
    //==================================================================================

    resource function post reg(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteSchedule(caller, req);
    }

    resource function post log(http:Caller caller, http:Request req) returns error? {
        check controllers:deleteSchedule(caller, req);
    }
}
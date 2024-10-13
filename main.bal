import ballerina/http;
import BusyBees_DCMS.controllers;

service / on new http:Listener(8080) {
    resource function get hello(http:Caller caller, http:Request req) returns error? {
        check caller->respond("Hello from main service!");
    }

    resource function get child(http:Caller caller, http:Request req) returns error? {
        check controllers:getAllChidren(caller, req);
    }
}

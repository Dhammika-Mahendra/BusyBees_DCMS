// Data type for `children` table
public type Children record {
    int id;
    string address;
    string dob;          // Date is represented as a string in ISO 8601 format in Ballerina
    string first_name;
    string last_name;
    int? guardian_id;      // Nullable field
};

// Data type for `guardians` table
public type Guardian record {
    int id;
    string address;
    string? email;        // Nullable field
    string? first_name;    // Nullable field
    string? last_name;     // Nullable field
    string? phone_number;  // Nullable field
};

// Data type for `classrooms` table
public type Classroom record {
    int id;
    string? age_group;     // Nullable field
    string? class_name;    // Nullable field
    string last_updated;   // DateTime is represented as a string in Ballerina
};

// Data type for `staffs` table
public type Staff record {
    int id;
    string? email;        // Nullable field
    string? first_name;    // Nullable field
    string? last_name;     // Nullable field
    string? phone_number;  // Nullable field
    string? role;         // Nullable field
    string? password;     // Nullable field
};

// Data type for `schedules` table
public type Schedule record {
    int id;
    string date;          // DateTime is represented as a string
    string? end_time;      // Nullable DateTime string
    string? start_time;    // Nullable DateTime string
    int? staff_id;         // Nullable field
    int? child_id;         // Nullable field
    int? classroom_id;     // Nullable field
};

public type Auth record {
    string email;
    string password;
};
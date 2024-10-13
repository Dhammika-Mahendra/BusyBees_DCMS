// Data type for `children` table
public type Children record {
    int id;
    string address;
    string dob;          // Date is represented as a string in ISO 8601 format in Ballerina
    string first_Name;
    string last_Name;
    int? guardian_Id;      // Nullable field
};

// Data type for `guardians` table
public type Guardian record {
    int id;
    string address;
    string? email;        // Nullable field
    string? firstName;    // Nullable field
    string? lastName;     // Nullable field
    string? phoneNumber;  // Nullable field
};

// Data type for `classrooms` table
public type Classroom record {
    int id;
    string? age_Group;     // Nullable field
    string? class_Name;    // Nullable field
    string last_Updated;   // DateTime is represented as a string in Ballerina
};

// Data type for `staffs` table
public type Staff record {
    int id;
    string? email;        // Nullable field
    string? firstName;    // Nullable field
    string? lastName;     // Nullable field
    string? phoneNumber;  // Nullable field
    string? role;         // Nullable field
};

// Data type for `schedules` table
public type Schedule record {
    int id;
    string date;          // DateTime is represented as a string
    string? endTime;      // Nullable DateTime string
    string? startTime;    // Nullable DateTime string
    int? staffId;         // Nullable field
    int? childId;         // Nullable field
    int? classroomId;     // Nullable field
};

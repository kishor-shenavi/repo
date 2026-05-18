
Step 1: Create Custom Object

Go to:

Setup → Object Manager → Create → Custom Object
Property	Value
Label	Employee
Plural Label	Employees
Object Name	Employee
Record Name	Employee Name
Data Type	Text

Click:

Save
Step 2: Create Fields

Go to:

Object Manager → Employee → Fields & Relationships → New
Field Label	Type	API Name
Employee_ID	Text	Employee_ID__c
Email	Email	Email__c
Birth_Date	Date	Birth_Date__c
Department	Picklist	Department__c
Department Picklist Values
HR
IT
Finance
Marketing

public class EmployeeManagementService {

    // Add Employee
    public static void addEmployee(
        String name,
        String empId,
        String email,
        Date dob,
        String dept
    ) {

        Employee__c emp = new Employee__c(

            Name = name,
            Employee_ID__c = empId,
            Email__c = email,
            Birth_Date__c = dob,
            Department__c = dept
        );

        insert emp;

        System.debug(
            'Employee Added Successfully: ' + empId
        );
    }

    // View All Employees
    public static void viewAllEmployees() {

        List<Employee__c> employees = [

            SELECT
                Name,
                Employee_ID__c,
                Email__c,
                Birth_Date__c,
                Department__c

            FROM Employee__c

            ORDER BY CreatedDate DESC
        ];

        System.debug(
            '========== EMPLOYEE LIST =========='
        );

        for (Employee__c e : employees) {

            System.debug(

                'Employee ID: ' + e.Employee_ID__c +

                ' | Name: ' + e.Name +

                ' | Email: ' + e.Email__c +

                ' | Birth Date: ' + e.Birth_Date__c +

                ' | Department: ' + e.Department__c
            );
        }
    }

    // Delete Employee
    public static void deleteEmployee(String empId) {

        List<Employee__c> empList = [

            SELECT Id
            FROM Employee__c
            WHERE Employee_ID__c = :empId
            LIMIT 1
        ];

        if (!empList.isEmpty()) {

            delete empList[0];

            System.debug(
                'Employee Deleted Successfully'
            );

        } else {

            System.debug(
                'Employee Not Found'
            );
        }
    }
}


// Choose Action
// 1 = Add Employee
// 2 = View Employees
// 3 = Delete Employee

// Integer userChoice = 1;

// if (userChoice == 1) {

//     // Add Employee
//     EmployeeManagementService.addEmployee(

//         'Siddhi Chavan',
//         'EMP101',
//         'siddhi@example.com',
//         Date.newInstance(2004, 6, 8),
//         'IT'
//     );
// }

// else if (userChoice == 2) {

//     // View Employees
//     EmployeeManagementService.viewAllEmployees();
// }

// else if (userChoice == 3) {

//     // Delete Employee
//     EmployeeManagementService.deleteEmployee('EMP101');
// }
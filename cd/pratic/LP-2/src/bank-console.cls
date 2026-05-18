Step 1: Create Custom Object

Go to:

Setup → Object Manager → Create → Custom Object
Property	Value
Label	Bank Customer
Plural Label	Bank Customers
Object Name	Bank_Customer
Record Name	Customer Name
Data Type	Text

Click:

Save
Step 2: Create Fields

Go to:

Object Manager → Bank Customer → Fields & Relationships → New
Field Label	Type	API Name
Customer_ID	Text	Customer_ID__c
Email	Email	Email__c
Birth_Date	Date	Birth_Date__c
Department	Picklist	Department__c
Department Picklist Values
Savings
Current
Loan
Fixed Deposit

public class BankSystemService {

    // Add Customer
    public static void addCustomer(
        String name,
        String custId,
        String email,
        Date dob,
        String dept
    ) {

        Bank_Customer__c cust = new Bank_Customer__c(

            Name = name,
            Customer_ID__c = custId,
            Email__c = email,
            Birth_Date__c = dob,
            Department__c = dept
        );

        insert cust;

        System.debug(
            'Customer Added Successfully'
        );
    }

    // View Customers
    public static void viewCustomers() {

        List<Bank_Customer__c> customers = [

            SELECT
                Name,
                Customer_ID__c,
                Email__c,
                Birth_Date__c,
                Department__c

            FROM Bank_Customer__c

            ORDER BY CreatedDate DESC
        ];

        System.debug(
            '========== CUSTOMER LIST =========='
        );

        for (Bank_Customer__c c : customers) {

            System.debug(

                'Customer ID: ' + c.Customer_ID__c +

                ' | Name: ' + c.Name +

                ' | Email: ' + c.Email__c +

                ' | Birth Date: ' + c.Birth_Date__c +

                ' | Department: ' + c.Department__c
            );
        }
    }

    // Delete Customer
    public static void deleteCustomer(String custId) {

        List<Bank_Customer__c> custList = [

            SELECT Id
            FROM Bank_Customer__c
            WHERE Customer_ID__c = :custId
            LIMIT 1
        ];

        if (!custList.isEmpty()) {

            delete custList[0];

            System.debug(
                'Customer Deleted Successfully'
            );

        } else {

            System.debug(
                'Customer Not Found'
            );
        }
    }
}

// Choose Action
// 1 = Add Customer
// 2 = View Customers
// 3 = Delete Customer

// Integer userChoice = 1;

// if (userChoice == 1) {

//     // Add Customer
//     BankSystemService.addCustomer(

//         'Pratik Chavan',
//         'C101',
//         'pratik@gmail.com',
//         Date.newInstance(2003, 5, 20),
//         'Savings'
//     );
// }

// else if (userChoice == 2) {

//     // View Customers
//     BankSystemService.viewCustomers();
// }

// else if (userChoice == 3) {

//     // Delete Customer
//     BankSystemService.deleteCustomer('C101');
// }



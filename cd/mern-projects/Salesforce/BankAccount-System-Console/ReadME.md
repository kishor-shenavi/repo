# Assignment 5: Bank Account System (Console Based)

## Aim

To develop a **console-based Bank Account Management System** in Salesforce using **Custom Objects**, **SOQL**, and **Apex DML Operations** such as:

- Insert
- Retrieve
- Update
- Delete

---

# Step 1: Create Custom Object

Navigate to:

```text
Setup → Object Manager → Create → Custom Object
```

Fill the details:

| Property | Value |
|---|---|
| Label | Bank |
| Plural Label | Banks |
| Record Name | Name |
| Data Type | Text |

Enable:
- ✅ Allow Reports
- ✅ Allow Activities
- ✅ Allow Search

Click **Save**

---

# Step 2: Create Custom Fields

Navigate to:

```text
Setup → Object Manager → Bank → Fields & Relationships → New
```

---

## Field 1: Employee ID

| Property | Value |
|---|---|
| Data Type | Auto Number |
| Field Label | Emp ID |
| Display Format | EMP-{0000} |
| Starting Number | 1 |

---

## Field 2: Email

| Property | Value |
|---|---|
| Data Type | Email |
| Field Label | Email |

---

## Field 3: DOB

| Property | Value |
|---|---|
| Data Type | Date |
| Field Label | DOB |

---

## Field 4: Department

| Property | Value |
|---|---|
| Data Type | Picklist |
| Field Label | Department |

### Picklist Values

```text
Credit Card
Debit Card
Loans
Insurance
Investments
```

---

# Step 3: Insert Record

## Apex Code

```java
try{

    // Creating the Record
    Bank__c bankAcc = new Bank__c(
        Name='Neeraj Kharde',
        Email__c = 'neerajkharde7@gmail.com',
        DOB__c = Date.valueOf('2005-03-30'),
        Department__c = 'Credit Card'    
    );

    // Inserting Record into Salesforce Database
    insert bankAcc;

    System.debug('Account Created');

    // Fetching Records from Database
    List<Bank__c> accList = new List<Bank__c>();

    accList = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        LIMIT 2
    ];

    // Displaying Records
    for(Bank__c a : accList){
        System.debug(a);
    }

}catch(Exception e) {

    System.debug('Error: '+e.getMessage());
}
```

---

# Step 4: Update Record

## Apex Code

```java
try{

    // Getting All Records
    List<Bank__c> accList = new List<Bank__c>();

    accList = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        LIMIT 5
    ];

    for(Bank__c a : accList){
        System.debug(a);
    }

    // Fetching Record to Update
    String empId = 'EMP-0001'; // This is one example

    Bank__c account = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        WHERE Emp_ID__c = :empId
    ];

    // Updating Values
    account.Name = 'Neeraj';
    account.Department__c = 'Debit Card';

    // Updating Record in Database
    update account;

    // Checking Updated Records
    accList = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        LIMIT 5
    ];

    for(Bank__c a : accList){
        System.debug(a);
    }

    System.debug('Updated Successfully');

}catch(Exception e) {

    System.debug('Error: '+e.getMessage());
}
```

---

# Step 5: Delete Record

## Apex Code

```java
try{

    // Getting All Records
    List<Bank__c> accList = new List<Bank__c>();

    accList = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        LIMIT 5
    ];

    for(Bank__c a : accList){
        System.debug(a);
    }

    // Fetching Record to Delete
    String empId = 'EMP-0001';

    Bank__c account = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        WHERE Emp_ID__c = :empId
    ];

    // Deleting Record
    delete account;

    // Checking Remaining Records
    accList = [
        SELECT Emp_ID__c, Name, Email__c, DOB__c, Department__c
        FROM Bank__c
        LIMIT 5
    ];

    for(Bank__c a : accList){
        System.debug(a);
    }

    System.debug('Deleted Successfully');

}catch(Exception e) {

    System.debug('Error: '+e.getMessage());
}
```

---

# Step 6: Execute in Developer Console

Navigate to:

```text
Gear Icon ⚙️ → Developer Console
```

Then:

```text
Debug → Open Execute Anonymous Window
```

OR press:

```text
Ctrl + E
```

Paste the code and click:

```text
Execute
```

---

# Step 7: Verify Records in Salesforce

Navigate to:

```text
App Launcher → Bank
```
(It works provided your custom object has a Tab)
Open:
- Recently Viewed
- OR All Records

You can verify:
- Inserted Records
- Updated Records
- Deleted Records

---

# Concepts Used

- Custom Objects
- Custom Fields
- Auto Number Fields
- Apex
- SOQL
- DML Operations
- Exception Handling
- Lists
- For-each Loop

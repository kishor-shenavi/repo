# Salesforce Apex CRUD Operations using Execute Anonymous

## CREATE

```java
Student__c s = new Student__c(
    Name = 'Neeraj',
    Class__c = 'TE-2',
    Roll_Number__c = 101,
    Mobile_Number__c = '9359069585'
);

insert s;
```

---

## READ

```java
Student__c stu = [
    SELECT Id, Name, Class__c
    FROM Student__c
    LIMIT 1
];

System.debug(stu.Name);
```

---

## UPDATE

```java
Student__c stu = [
    SELECT Id, Name
    FROM Student__c
    LIMIT 1
];

stu.Name = 'Updated Name';

update stu;
```

---

## DELETE

```java
Student__c stu = [
    SELECT Id
    FROM Student__c
    LIMIT 1
];

delete stu;
```

---

## Exception Handling Example

```java
try {

    Student__c s = new Student__c(
        Name = 'Test Student'
    );

    insert s;

    System.debug('Student Added Successfully');

}
catch(DmlException e){

    System.debug('Error: ' + e.getMessage());

}
```

---

## Important Notes

- `insert` is used to create a new record.
- `update` modifies an existing record.
- `delete` removes a record.
- `SELECT` is used to fetch records from Salesforce.
- `System.debug()` prints output in logs.
- In Execute Anonymous, records are usually handled using separate variables.
- `student.Id = null` is generally needed in reusable Visualforce controllers, not in simple Execute Anonymous CRUD examples.

Property	Value
Label	Children
Plural Label	Children
Object Name	Children
Record Name	Student Name
Data Type	Text

Click:

Save
Step 2: Create Fields

Go to:

Object Manager → Children → Fields & Relationships → New
Field Label	Type	API Name
Roll_No	Number	Roll_No__c
Class	Text	Class__c
Mobile_No	Phone	Mobile_No__c



public class ChildrenController {

    public Children__c child { get; set; }

    public List<Children__c> childList { get; set; }

    public Id selectedId { get; set; }

    // Constructor
    public ChildrenController() {

        child = new Children__c();

        loadChildren();
    }

    // Load Records
    public void loadChildren() {

        childList = [

            SELECT
                Id,
                Name,
                Roll_No__c,
                Class__c,
                Mobile_No__c

            FROM Children__c

            ORDER BY CreatedDate DESC
        ];
    }

    // Save Record
    public PageReference saveChild() {

        insert child;

        child = new Children__c();

        loadChildren();

        return null;
    }

    // Delete Record
    public PageReference deleteChild() {

        if (selectedId == null) {

            ApexPages.addMessage(

                new ApexPages.Message(
                    ApexPages.Severity.ERROR,
                    'No Record Selected'
                )
            );

            return null;
        }

        Children__c c = [

            SELECT Id
            FROM Children__c
            WHERE Id = :selectedId
            LIMIT 1
        ];

        delete c;

        ApexPages.addMessage(

            new ApexPages.Message(
                ApexPages.Severity.CONFIRM,
                'Record Deleted Successfully'
            )
        );

        loadChildren();

        return null;
    }
}


<apex:page controller="ChildrenController">

    <apex:form id="formId">

        <apex:pageMessages />

        <!-- Add Child -->
        <apex:pageBlock title="Children Record Management">

            <apex:pageBlockSection columns="1">

                <apex:inputField value="{!child.Name}" />

                <apex:inputField value="{!child.Roll_No__c}" />

                <apex:inputField value="{!child.Class__c}" />

                <apex:inputField value="{!child.Mobile_No__c}" />

            </apex:pageBlockSection>

            <apex:commandButton
                value="Save Record"
                action="{!saveChild}"
                rerender="formId" />

        </apex:pageBlock>

        <!-- Record List -->
        <apex:pageBlock title="Children List">

            <apex:pageBlockTable
                value="{!childList}"
                var="c">

                <apex:column
                    value="{!c.Name}"
                    headerValue="Student Name" />

                <apex:column
                    value="{!c.Roll_No__c}"
                    headerValue="Roll No" />

                <apex:column
                    value="{!c.Class__c}"
                    headerValue="Class" />

                <apex:column
                    value="{!c.Mobile_No__c}"
                    headerValue="Mobile No" />

                <!-- Delete -->
                <apex:column headerValue="Action">

                    <apex:commandButton
                        value="Delete"
                        action="{!deleteChild}"
                        rerender="formId">

                        <apex:param
                            name="childId"
                            value="{!c.Id}"
                            assignTo="{!selectedId}" />

                    </apex:commandButton>

                </apex:column>

            </apex:pageBlockTable>

        </apex:pageBlock>

    </apex:form>

</apex:page>

Property	Value
Label	Product Inventory
Plural Label	Product Inventories
Object Name	Product_Inventory
Record Name	Product Name
Data Type	Text

Click:

Save
Step 2: Create Fields

Go to:

Object Manager → Product Inventory → Fields & Relationships → New
Field Label	Type	API Name
Serial_No	Text	Serial_No__c
Manufacture_Date	Date	Manufacture_Date__c
Expiry_Date	Date	Expiry_Date__c


public class ProductInventoryController {

    public Product_Inventory__c product { get; set; }

    public List<Product_Inventory__c> productList { get; set; }

    public Id selectedId { get; set; }

    // Constructor
    public ProductInventoryController() {

        product = new Product_Inventory__c();

        loadProducts();
    }

    // Load Products
    public void loadProducts() {

        productList = [

            SELECT
                Id,
                Name,
                Serial_No__c,
                Manufacture_Date__c,
                Expiry_Date__c

            FROM Product_Inventory__c

            ORDER BY CreatedDate DESC
        ];
    }

    // Save Product
    public PageReference saveProduct() {

        insert product;

        product = new Product_Inventory__c();

        loadProducts();

        return null;
    }

    // Delete Product
    public PageReference deleteProduct() {

        if (selectedId == null) {

            ApexPages.addMessage(

                new ApexPages.Message(
                    ApexPages.Severity.ERROR,
                    'No Product Selected'
                )
            );

            return null;
        }

        Product_Inventory__c prod = [

            SELECT Id
            FROM Product_Inventory__c
            WHERE Id = :selectedId
            LIMIT 1
        ];

        delete prod;

        ApexPages.addMessage(

            new ApexPages.Message(
                ApexPages.Severity.CONFIRM,
                'Product Deleted Successfully'
            )
        );

        loadProducts();

        return null;
    }
}


<apex:page controller="ProductInventoryController">

    <apex:form id="formId">

        <apex:pageMessages />

        <!-- Add Product Section -->
        <apex:pageBlock title="Product Inventory Management">

            <apex:pageBlockSection columns="1">

                <apex:inputField value="{!product.Name}" />

                <apex:inputField value="{!product.Serial_No__c}" />

                <apex:inputField value="{!product.Manufacture_Date__c}" />

                <apex:inputField value="{!product.Expiry_Date__c}" />

            </apex:pageBlockSection>

            <apex:commandButton
                value="Save Product"
                action="{!saveProduct}"
                rerender="formId" />

        </apex:pageBlock>

        <!-- Product List -->
        <apex:pageBlock title="Product List">

            <apex:pageBlockTable
                value="{!productList}"
                var="p">

                <!-- Product Name -->
                <apex:column
                    value="{!p.Name}"
                    headerValue="Product Name" />

                <!-- Serial Number -->
                <apex:column
                    value="{!p.Serial_No__c}"
                    headerValue="Serial No" />

                <!-- Manufacture Date -->
                <apex:column
                    value="{!p.Manufacture_Date__c}"
                    headerValue="Manufacture Date" />

                <!-- Expiry Date -->
                <apex:column
                    value="{!p.Expiry_Date__c}"
                    headerValue="Expiry Date" />

                <!-- Delete Button -->
                <apex:column headerValue="Action">

                    <apex:commandButton
                        value="Delete"
                        action="{!deleteProduct}"
                        rerender="formId">

                        <apex:param
                            name="productId"
                            value="{!p.Id}"
                            assignTo="{!selectedId}" />

                    </apex:commandButton>

                </apex:column>

            </apex:pageBlockTable>

        </apex:pageBlock>

    </apex:form>

</apex:page>
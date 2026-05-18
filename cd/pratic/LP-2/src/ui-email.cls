public class EmailVfController {

    public String toAddress { get; set; }
    public String subject { get; set; }
    public String body { get; set; }

    public Blob attachmentBody { get; set; }
    public String fileName { get; set; }

    // Send Email Method
    public void sendMail() {

        try {

            // Create Email Object
            Messaging.SingleEmailMessage mail =
                new Messaging.SingleEmailMessage();

            // Set Recipient
            mail.setToAddresses(
                new String[] { toAddress }
            );

            // Set Subject
            mail.setSubject(subject);

            // Set Body
            mail.setPlainTextBody(body);

            // Add Attachment if Present
            if (attachmentBody != null) {

                Messaging.EmailFileAttachment efa =
                    new Messaging.EmailFileAttachment();

                efa.setFileName(fileName);

                efa.setBody(attachmentBody);

                mail.setFileAttachments(
                    new Messaging.EmailFileAttachment[] { efa }
                );
            }

            // Send Email
            Messaging.sendEmail(
                new Messaging.SingleEmailMessage[] { mail }
            );

            // Success Message
            ApexPages.addMessage(
                new ApexPages.Message(
                    ApexPages.Severity.CONFIRM,
                    'Email sent successfully!'
                )
            );

            // Reset Fields
            toAddress = '';
            subject = '';
            body = '';

            attachmentBody = null;
            fileName = '';

        } catch (Exception e) {

            ApexPages.addMessages(e);
        }
    }
}

% ---------------

<apex:page controller="EmailVfController">

    <apex:form enctype="multipart/form-data">

        <apex:pageMessages />

        <apex:pageBlock title="Send Email Notification">

            <apex:pageBlockSection columns="1">

                <!-- Recipient Email -->
                <apex:inputText
                    value="{!toAddress}"
                    label="Recipient Email"
                    html-type="email"
                    required="true" />

                <!-- Subject -->
                <apex:inputText
                    value="{!subject}"
                    label="Subject" />

                <!-- Message Body -->
                <apex:inputTextarea
                    value="{!body}"
                    label="Message Body"
                    rows="5" />

                <!-- File Upload -->
                <apex:pageBlockSectionItem>

                    <apex:outputLabel value="Select Attachment" />

                    <apex:inputFile
                        value="{!attachmentBody}"
                        filename="{!fileName}" />

                </apex:pageBlockSectionItem>

            </apex:pageBlockSection>

            <!-- Buttons -->
            <apex:pageBlockButtons location="bottom">

                <apex:commandButton
                    value="Send Email"
                    action="{!sendMail}" />

            </apex:pageBlockButtons>

        </apex:pageBlock>

    </apex:form>

</apex:page>
public class EmailNotificationService {

    public static void sendEmail(
        String recipient,
        String subject,
        String body,
        Boolean includeAttachment
    ) {

        // Create Email Object
        Messaging.SingleEmailMessage mail =
            new Messaging.SingleEmailMessage();

        // Set Recipient
        mail.setToAddresses(
            new String[] { recipient }
        );

        // Set Subject
        mail.setSubject(subject);

        // Set Email Body
        mail.setPlainTextBody(body);

        // Add Attachment if Required
        if (includeAttachment) {

            Messaging.EmailFileAttachment attachment =
                new Messaging.EmailFileAttachment();

            attachment.setFileName('Practical_Attachment.txt');

            attachment.setBody(
                Blob.valueOf(
                    'This is a test attachment for the Salesforce Practical.'
                )
            );

            mail.setFileAttachments(
                new Messaging.EmailFileAttachment[] { attachment }
            );
        }

        // Send Email
        Messaging.SendEmailResult[] results =
            Messaging.sendEmail(
                new Messaging.SingleEmailMessage[] { mail }
            );

        // Check Result
        if (results[0].isSuccess()) {

            System.debug(
                'Email sent successfully to: ' + recipient
            );

        } else {

            System.debug(
                'Email failed to send: ' +
                results[0].getErrors()[0].getMessage()
            );
        }
    }
}


// // Parameters
// String toEmail = 'your-email@example.com'; // Change this to your email

// String subject = 'Salesforce Practical Test';

// String msg =
//     'Hello, this is a notification from Salesforce Apex.';

// // Call Email Service
// EmailNotificationService.sendEmail(
//     toEmail,
//     subject,
//     msg,
//     true
// );
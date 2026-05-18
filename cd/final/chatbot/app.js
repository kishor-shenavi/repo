// app.js

function chatbotResponse(message)
{
    message = message.toLowerCase();


    // GREETING

    if (
        ["hello", "hi", "hey"]
        .some(word => message.includes(word))
    )
    {
        return "Hello! Welcome to Hospital Chatbot.";
    }


    // DOCTOR

    else if (
        ["doctor", "physician", "specialist"]
        .some(word => message.includes(word))
    )
    {
        return "Doctors are available from 9 AM to 5 PM.";
    }


    // APPOINTMENT

    else if (
        ["appointment", "book", "booking"]
        .some(word => message.includes(word))
    )
    {
        return "Appointment request received. Please visit reception between 9 AM and 5 PM.";
    }


    // FEVER

    else if (
        ["fever", "temperature"]
        .some(word => message.includes(word))
    )
    {
        return "You may have an infection. Drink water and consult a doctor.";
    }


    // COUGH

    else if (
        ["cough", "cold"]
        .some(word => message.includes(word))
    )
    {
        return "Possible cold detected. Take proper rest and warm fluids.";
    }


    // HEADACHE

    else if (
        ["headache", "migraine"]
        .some(word => message.includes(word))
    )
    {
        return "Headache may occur due to stress or fatigue. Take proper rest.";
    }


    // STOMACH PAIN

    else if (
        ["stomach", "digestion", "vomit"]
        .some(word => message.includes(word))
    )
    {
        return "Possible digestion issue. Avoid oily food and stay hydrated.";
    }


    // CHEST PAIN

    else if (
        ["chest pain", "heart pain"]
        .some(word => message.includes(word))
    )
    {
        return "Emergency detected. Please visit hospital immediately.";
    }


    // EMERGENCY

    else if (
        ["emergency", "ambulance"]
        .some(word => message.includes(word))
    )
    {
        return "Call emergency helpline number 108 immediately.";
    }


    // MEDICINE

    else if (
        ["medicine", "tablet", "drug"]
        .some(word => message.includes(word))
    )
    {
        return "Please take medicines only after doctor consultation.";
    }


    // COVID

    else if (
        ["covid", "corona"]
        .some(word => message.includes(word))
    )
    {
        return "Wear mask, isolate yourself and consult a doctor immediately.";
    }


    // TESTS

    else if (
        ["blood test", "xray", "scan"]
        .some(word => message.includes(word))
    )
    {
        return "Diagnostic services are available from 8 AM to 6 PM.";
    }


    // ICU

    else if (
        ["icu", "critical"]
        .some(word => message.includes(word))
    )
    {
        return "ICU facility is available 24/7.";
    }


    // PAYMENT

    else if (
        ["payment", "fees", "bill"]
        .some(word => message.includes(word))
    )
    {
        return "Payments can be made at the billing counter or online.";
    }


    // DEFAULT

    else
    {
        return `
I can help with:
- appointments
- doctors
- fever
- cough
- emergency
- medicines
- ICU
- blood test
- payments
`;
    }
}



// SEND MESSAGE

function sendMessage()
{
    let input =
        document.getElementById("user-input");

    let message =
        input.value.trim();

    if(message === "")
    {
        return;
    }

    let chatBox =
        document.getElementById("chat-box");


    // USER MESSAGE

    chatBox.innerHTML += `
        <div>
            <b>You:</b> ${message}
        </div>
    `;


    // BOT RESPONSE

    let reply =
        chatbotResponse(message);

    chatBox.innerHTML += `
        <div>
            <b>Bot:</b> ${reply}
        </div>
    `;


    // CLEAR INPUT

    input.value = "";


    // AUTO SCROLL

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


































// function chatbotResponse(message) {

//     message = message.toLowerCase();

//     if(["hello", "hi"].some(word=>message.includes(word))){
//         return "Hello! Welcome to Hospital Chatbot";
//     }

//     else if (message.includes("doctor")) {
//         return "Doctors are available from 9 AM to 5 PM";
//     }

//     else if (message.includes("appointment")) {
//         return "Appointment booked successfully";
//     }

//     else if (message.includes("fever")) {
//         return "Please drink water and consult a doctor";
//     }

//     else if (message.includes("emergency")) {
//         return "Call emergency number 108";
//     }

//     else {
//         return "Sorry, I did not understand";
//     }
// }

// function sendMessage() {

//     let input = document.getElementById("user-input");

//     let message = input.value;

//     if (message === "") {
//         return;
//     }

//     let chatBox = document.getElementById("chat-box");

//     chatBox.innerHTML += `
//         <div>
//             <b>You:</b> ${message}
//         </div>
//     `;

//     let reply = chatbotResponse(message);

//     chatBox.innerHTML += `
//         <div>
//             <b>Bot:</b> ${reply}
//         </div>
//     `;

//     input.value = "";

//     chatBox.scrollTop = chatBox.scrollHeight;
// }
/* ========================= js/chatbot.js ========================= */

function sendMessage(){

    let input =
        document.getElementById("userInput").value;

    let userText =
        input.toLowerCase();

    let response = "";


    if(userText.includes("hello") ||
       userText.includes("hi")){

        response =
        "Hello 👋 Welcome to FoodieBot!";
    }


    else if(userText.includes("menu")){

        response =
        "We serve Pizza 🍕, Burger 🍔, Pasta 🍝 and Coffee ☕";
    }


    else if(userText.includes("price")){

        response =
        "Pizza ₹250, Burger ₹120, Pasta ₹180, Coffee ₹90";
    }


    else if(userText.includes("offer")){

        response =
        "Today's offer 🎉 Buy 1 Get 1 Burger!";
    }


    else if(userText.includes("timing")){

        response =
        "We are open from 10 AM to 11 PM";
    }


    else if(userText.includes("contact")){

        response =
        "You can contact us through Contact page 📞";
    }


    else{

        response =
        "Sorry 😅 I don't understand that.";
    }


    let chatbox = document.getElementById("chatbox");


    chatbox.innerHTML +=
    `<div class="user-msg">
        ${input}
     </div>`;


    chatbox.innerHTML +=
    `<div class="bot-msg">
        ${response}
     </div>`;


    document.getElementById("userInput").value = "";


    chatbox.scrollTop =
        chatbox.scrollHeight;
}
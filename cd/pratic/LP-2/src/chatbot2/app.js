function chat(message){
    message = message.toLowerCase();
    if(["hello", "hi"].some(word=>message.includes(word))){
        return "Hello"
    }else if(["doctor", "medicine"].some(word=>message.includes(word))){
        return "lawda boys"
    }else if(["appointment", "slot"].some(word=>message.includes(word))){
        return "ambani ho kya be"
    }else{
        return "bye lawde"
    }

}

function send(){
    let input = document.getElementById("input")
    let message = input.value
    if(message==" ") return;
    let chatbox = document.getElementById("chatbox")
    chatbox.innerHTML += `
    <div>
        <b>you:</b> ${message}
    </div>
    `
    let reply = chat(message)

    chatbox.innerHTML += `
    <div>
        <b>bot:</b> ${reply}
    </div>
    `

    input.value=""
    chatbox.scrollTop = chatbox.scrollHeight
}


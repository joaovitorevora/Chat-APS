// login elements
const login = document.querySelector(".login")
const loginForm = document.querySelector(".login_form")
const loginInput = document.querySelector(".login_input")
// chat elements
const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat_form")
const chatInput = document.querySelector(".chat_input")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]
const user = { id: "", name: "", color: "" }

let websocket

const getRandomColor = () =>{
    const randomIndex = Math.floor(Math.random() * colors.length) 
    return colors[randomIndex]
}

const processMessage = (data) => {
    console.log(data)
}

const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage

    
}

const sendMessage = (event) =>{
    event.preventDefault()

    const message = {
        userID: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}
loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)
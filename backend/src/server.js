const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

//definindo porta  do servidor e criando o servidor
const wss = new  WebSocketServer({ port: process.env.PORT || 8080 });

//conectando ao servidor
//quando conectar no servidor irá executar tudo que está dentro da function
wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.on("message", (data) => {
        //enviando mensagem para todos que estiverem conectados
        wss.clients.forEach((client) => client.send(data.toString()))       
    })

    console.log("client connected")
})

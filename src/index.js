// Supports ES6
// import { create, Whatsapp } from 'sulla';
const { db } = require("../src/models/banco");
const { step } = require("../src/models/stages");

const fs = require('fs');
const venom = require('venom-bot');

venom.create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

  const buttons = [
    {
      "buttonText": {
        "displayText": "Text of Button 1"
        }
      },
    {
      "buttonText": {
        "displayText": "Text of Button 2"
        }
      },
    {
      "buttonText": {
        "displayText": "Text of Button 3"
        }
      },
    {
      "buttonText": {
        "displayText": "Text of Button 4"
        }
      },
    ]


function start(client) {

    client.onMessage((message) => {

        if (message.body === 'Hi' && message.isGroupMsg === false) {
          return client.sendText(message.from, 'Welcome Venom 🕷')
        }
        if (message.body === 'btn' && message.isGroupMsg === false) {
           return client.sendButtons(message.from  , 'Title' , buttons , 'Description')
            .then((result) => {
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        }

        let resp = step[getStage(message.from)].obj.execute(
            message.from,
            message.body,
            message.sender.name
        );
        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            client.sendText(message.from, element);
        }  
    })
}

 function getStage(user) {
    if (db[user]) {
        //Se existir esse numero no banco de dados
        return db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        db[user] = {
            stage: 0,
            itens: [],
        };
        return db[user].stage;
    }
}



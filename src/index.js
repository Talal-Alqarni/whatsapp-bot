// Supports ES6
// import { create, Whatsapp } from 'sulla';
const { db } = require("../src/models/banco");
const { step } = require("../src/models/stages");
const { buttons } = require("./menu/Butn");
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




    const buttonOne = [
      {
        "buttonText": {
          "displayText": "✅"
          }
        },
      {
        "buttonText": {
          "displayText": "❎"
          }
        },
      ]

      const buttonTow = [
        {
          "buttonText": {
            "displayText": "تصميم وبرمجة المواقع"
            }
          },
        {
          "buttonText": {
            "displayText": "تصميم وبرمجة تطبيقات الجوال"
            }
          },
          {
            "buttonText": {
              "displayText": "إنشاء و إدارة سيرفرات امازون"
              }
            },
            {
              "buttonText": {
                "displayText": "برمجة الرد الالي (بوت) للواتساب"
                }
              },
              {
                "buttonText": {
                  "displayText": "حجز موعد خدمة اخرى"
                  }
                },
        ]

        const buttonThree = [
          {
            "buttonText": {
              "displayText": "نعم أحجزلي موعد استشارة"
              }
            },
          {
            "buttonText": {
              "displayText": "لا شكراً لك"
              }
            },
          ]

          const buttonFore = [
            {
              "buttonText": {
                "displayText": "نعم اريد تاكيد حجز الموعد"
                }
              },
            {
              "buttonText": {
                "displayText": "لا شكراً لك"
                }
              },
            ]


let Status = '';


function start(client) {

    client.onMessage((message) => {

        // if (message.body === 'Hi' && message.isGroupMsg === false) {
        //   return client.sendText(message.from, 'Welcome Venom 🕷')
        // }



        if (message.body === '#55') {
            client.sendText(message.from, ' تم تشغيل البوت بنجاح 🤖') 
            return Status = 'online';
        }

        if (message.body === '*55') {
          client.sendText(message.from, ' تم اغلاق البوت بنجاح 👋') 
          Status = 'offline'
          return client.stop();
        }


        if (Status === 'online') {
 
        if (message.body === '✅') {
          return client.sendButtons(message.from  , 'قائمة الخدمات المقدمة' , buttonTow , 'اختر الخدمة المناسبة لك' )
          .then((result) => {})
          .catch((erro) => {});
        }

        if (message.body === '❎') {
          return client.sendButtons(message.from  , 'لديك فكرة مشروع وتحتاج استشارة تقنية ؟' , buttonThree , 'مجموعة الغيمة الذكية ستساعدك بالتأكد من جدوى مشروعك وإختباره قبل إطلاقه' )
          .then((result) => {})
          .catch((erro) => {});
        }

        if (message.body === 'نعم أحجزلي موعد استشارة' || message.body === 'تصميم وبرمجة المواقع' || message.body === 'تصميم وبرمجة تطبيقات الجوال' || message.body === 'إنشاء و إدارة سيرفرات امازون' || message.body === 'برمجة الرد الالي (بوت) للواتساب' || message.body === 'حجز موعد خدمة اخرى') {
          return client.sendButtons(message.from  , 'سوف اقوم بحجز موعد لك لتقديم الخدمة' , buttonFore , 'اختر نعم او لا لتأكيد حجز الموعد' )
          .then((result) => {})
          .catch((erro) => {});
        }

        if (message.body === 'نعم اريد تاكيد حجز الموعد') {
          return [
            client.sendText(message.from, 'سيتم التواصل معك في أقرب وقت ، مع السلامة' ) ,
            client.sendText(message.from, 'تم تأكيد حجز الموعد 👍🏻' )
          ]
        }
        if (message.body === 'لا شكراً لك') {
          return client.sendText(message.from, 'عفوا ، مع السلامة' )
        }


          if (message.body) {
            stamp = new Date();
            hours = stamp.getHours();
            if (hours >= 18 && hours < 24) {
                time = "مساء الخير"
            } else if (hours >= 12 && hours < 18) {
                time = "مساء الخير"
            } else if (hours >= 0 && hours < 12) {
                time = "صباح الخير"
            }
            client.getContact(message.from).then((contact) => {
return client.sendButtons(message.from  , ` ${time}  ${contact.name} 
🤖 أنا مدير اعمال افتراضي اقوم بالرد عليك نيابة عن مجموعة الغيمة الذكية  ،
تفضل كيف اقدر اخدمك ؟ `
 , buttonOne ,`اختر ✔️ لعرض  قائمة الخدمات المتوفرة 
اختر ✖️ للإلغاء`)
            });

          }

        // let resp = step[getStage(message.from)].obj.execute(
        //     message.from,
        //     message.body,
        //     message.sender.name
        // );
        // for (let index = 0; index < resp.length; index++) {
        //     const element = resp[index];
        //     client.sendText(message.from, element);
        // }  

 
        }
      });
}
//  function getStage(user) {
//   if (db[user]) {
//       //Se existir esse numero no banco de dados
//       return db[user].stage;
//   } else {
//       //Se for a primeira vez que entra e contato
//       db[user] = {
//           stage: 0,
//           itens: [],
//       };
//       return db[user].stage;
//   }
// }

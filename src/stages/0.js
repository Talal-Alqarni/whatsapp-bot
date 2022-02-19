const { menu0 } = require("../menu/menu0");
const { db } = require("../models/banco");

function execute(user, msg, contato) {

    // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
    stamp = new Date();
    hours = stamp.getHours();
    if (hours >= 18 && hours < 24) {
        time = "مساء الخير"
    } else if (hours >= 12 && hours < 18) {
        time = "مساء الخير"
    } else if (hours >= 0 && hours < 12) {
        time = "صباح الخير"
    }


    let menu = " قائمة الخدمات \n\n";

    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value} - ${element.description}        ريال سعودي ${element.price} \n`;
    });

    db[user].stage = 1;

    return [
        menu,
        `${time}  ${contato} أنا مدير اعمال افتراضي اقوم بالرد عليك نيابة عن مجموعة الغيمة الذكية ، تفضل كيف اقدر اخدمك ؟ `,
    ];
}

exports.execute = execute;
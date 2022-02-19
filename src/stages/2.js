const { db } = require("../models/banco");

function execute(user, msg) {
    if (msg === "*") {
        db[user].stage = 0;
        return ["تم إلغاء الطلب بنجاح"];
    }

    if (msg === "#") {
        db[user].stage = 3;
        return ["الرجاء إدخال العنوان:"];
    }

    let resumo = "  ملخص الطلب \n";
    let total = 0;
    db[user].itens.forEach((value) => {
        console.log(value);
        resumo += `${value.description} ----------------  ${value.price} \n`;

        total += value.price;
    });

    resumo += "-------------------------\n";
    resumo += ` الإجمالي : ${total} ريال سعودي `;

    return [
        "للتأكيد أدخل # أو للإلغاء أدخل *",
        resumo,
    ];
}

exports.execute = execute;
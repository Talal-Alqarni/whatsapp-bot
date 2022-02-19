const { menu0 } = require("../menu/menu0");
const { db } = require("../models/banco");

function execute(user, msg) {
    if (msg === "*") {
        db[user].stage = 0;
        return ["تم إلغاء الطلب بنجاح"];
    }

    if (msg === "#") {
        db[user].stage = 2;
        return ["نحن نغلق طلبك ، حسنًا؟"];
    }

    if (!menu0[msg]) {
        return [
            "رمز غير صالح ، أدخل بشكل صحيح",
            "```اكتب # للإنهاء أو * للإلغاء```",
        ];
    }

    db[user].itens.push(menu0[msg]);

    return [
        "```اكتب # للإنهاء أو * للإلغاء```",
        `العنصر (${menu0[msg].description}) أضيف بنجاح`,
    ];
}

exports.execute = execute;
const { db } = require("../models/banco");
const { step } = require("../models/stages");

function execute(user, msg) {
    if (msg === "*") {
        db[user].stage = 0;
        return ["تم إلغاء الطلب بنجاح"];
    }

    if (msg === "#") {
        db[user].stage = 4;
        return step[4].obj.execute(user, "");
    }
    return [
        "```اكتب # للمتابعة أو * للإلغاء```",
        `تأكيد عنوان التسليم : \n ${msg}`,
    ];
}

exports.execute = execute;
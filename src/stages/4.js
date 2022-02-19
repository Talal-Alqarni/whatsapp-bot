const { db } = require("../models/banco");

function execute(user, msg) {
    db[user].stage = 0;
    return [
        "شكرا لك .",
        "الرجاء الانتظار ، سيصل طلبك قريبًا",
        "لمزيد من المعلومات اتصل على 33333-3311",
    ];
}

exports.execute = execute;
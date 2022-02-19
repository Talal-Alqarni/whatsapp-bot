// const { db } = require("../models/banco");
// //const { step } = require("../models/stages");
// let estagioInterno = 0;

// function execute(user, msg) {
//     //db[user].stage = 0;

//     if (estagioInterno === 1) {
//         db[user].stage = 4;

//         return stages.step[4].obj.execute(user, "");
//     }
//     if (msg === "1") {
//         estagioInterno++;
//         return ["أدخل المبلغ نقدًا لأخذ التغيير: "];
//     }
//     if (msg === "3") {
//         return ["مفتاح PIX هنا 000.000.000-00"]
//     }
//     return ["اختر طريقة الدفع:\n1️⃣-كاش\n2️⃣-بطاقة\n3️⃣-الحساب يوم الحساب"];
// }

// exports.execute = execute;
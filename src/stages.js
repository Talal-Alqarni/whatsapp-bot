var stages = {
  0: {
    descricao: "مرحبا",
    obj: require("./stages/0"),
  },
  1: {
    descricao: "مبيعات",
    obj: require("./stages/1"),
  },
  2: {
    descricao: "ملخص",
    obj: require("./stages/2"),
  },
  3: {
    descricao: "العنوان",
    obj: require("./stages/3"),
  },
  4: {
    descricao: "الشحن",
    obj: require("./stages/4"),
  },
  5: {
    descricao: "طريقة الدفع",
    obj: require("./stages/5"),
  },
};

exports.step = stages;

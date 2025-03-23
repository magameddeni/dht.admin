export const PACKAGE = [
  {
    key: "weight",
    value: "Вес, г",
    rules: {
      required: { value: true, message: "Не указан Вес, г" },
    },
  },
  {
    key: "width",
    value: "Ширина, мм",
    rules: {
      required: { value: true, message: "Не указана Ширина, мм" },
    },
  },
  {
    key: "length",
    value: "Длина, мм",
    rules: {
      required: { value: true, message: "Не указана Длина, мм" },
    },
  },
  {
    key: "height",
    value: "Высота, мм",
    rules: {
      required: { value: true, message: "Не указана Высота, мм" },
    },
  },
]

export const MAIN_INFO = [
  {
    key: "productName",
    value: "Наименования",
    rules: {
      required: {
        value: true,
        message: "Название товара не может быть пустым",
      },
    },
  },
  // {
  //   key: "seller",
  //   value: "Магазин",
  //   rules: {
  //     required: { value: true, message: "Не указан магазин" },
  //   },
  // },
  { key: "barcode", value: "Штрихкод" },
  { key: "SKU", value: "Артикул(вашей системе)" },
  { key: "manufacturerSKU", value: "Артикул производителя" },
  { key: "stock_quantity", value: "Остатки на складе" },
  { key: "base_price", value: "Цена" },
]

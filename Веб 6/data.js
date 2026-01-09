// data.js
// ЕДИНЫЙ источник данных о блюдах

window.DISHES = [
  // =========================
  // SOUPS (6): fish 2, meat 2, veg 2
  // =========================
  {
    keyword: "gaspacho",
    name: "Гаспачо",
    price: 195,
    category: "soup",
    count: "350 г",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    kind: "veg"
  },
  {
    keyword: "mushroom_soup",
    name: "Грибной суп-пюре",
    price: 185,
    category: "soup",
    count: "330 г",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_652b8c38816f970013a9191c_652c18de3edfc33e5dbca251/scale_1200",
    kind: "veg"
  },
  {
    keyword: "chicken_soup",
    name: "Куриный суп",
    price: 330,
    category: "soup",
    count: "350 г",
    image: "https://avatars.mds.yandex.net/i?id=2185af7e13fbba841243bfb579d50df486bbf3f4-7761179-images-thumbs&n=13",
    kind: "meat"
  },
  {
    keyword: "ramen",
    name: "Рамен",
    price: 375,
    category: "soup",
    count: "425 г",
    image: "https://avatars.mds.yandex.net/i?id=4e817204efe666414e105a2534f0b108dbda9d26-5724346-images-thumbs&n=13://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80",
    kind: "meat"
  },
  {
    keyword: "tom_yum",
    name: "Том ям с креветками",
    price: 650,
    category: "soup",
    count: "500 г",
    image: "https://avatars.mds.yandex.net/i?id=52aac3fbaca2b7ed09c4d77f80498074cef632ee-17043132-images-thumbs&n=13://https://yandex.ru/images/search?text=Том+ям+с+креветками&pos=5&rpt=simage&img_url=https%3A%2F%2Fcdn.food.ru%2Funsigned%2Ffit%2F640%2F480%2Fce%2F0%2FczM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MTAyNC8zV1VaYlAuanBlZw.jpg&from=tabbar&lr=213.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80",
    kind: "fish"
  },
  {
    keyword: "norwegian_soup",
    name: "Норвежский суп",
    price: 270,
    category: "soup",
    count: "330 г",
    image: "https://i.pinimg.com/originals/d8/51/8c/d8518c0cb2d4edc23d607304b39ccdaf.jpg",
    kind: "fish"
  },

  // =========================
  // MAINS (6): fish 2, meat 2, veg 2
  // =========================
  {
    keyword: "fish_cutlet_rice",
    name: "Рыбная котлета с рисом и спаржей",
    price: 320,
    category: "main",
    count: "270 г",
    image: "https://avatars.mds.yandex.net/i?id=dbbdea4c30c9066c9535dc8ae3b16f6476b4983f-12523274-images-thumbs&n=13",
    kind: "fish"
  },
  {
    keyword: "shrimp_pasta",
    name: "Паста с креветками",
    price: 340,
    category: "main",
    count: "280 г",
    image: "https://avatars.mds.yandex.net/i?id=3bcfce58940358163e2f3d438fd37b6db4cd3a75-5313379-images-thumbs&n=13",
    kind: "fish"
  },
  {
    keyword: "lasagna",
    name: "Лазанья",
    price: 385,
    category: "main",
    count: "310 г",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_679dd5d459f58c4070f22c53_679dd6b679a95e5d4e6d7903/scale_1200",
    kind: "meat"
  },
  {
    keyword: "chicken_cutlets",
    name: "Котлеты из курицы с картофельным пюре",
    price: 225,
    category: "main",
    count: "280 г",
    image: "https://avatars.mds.yandex.net/i?id=b1c4d17acc5ea320d8997e00c39ef77867db1b22-10843930-images-thumbs&n=13",
    kind: "meat"
  },
  {
    keyword: "margarita_pizza",
    name: "Пицца Маргарита",
    price: 450,
    category: "main",
    count: "470 г",
    image: "https://avatars.mds.yandex.net/i?id=77315ca4bfa5f158c31b60017865e3a0_l-5887546-images-thumbs&n=13",
    kind: "veg"
  },
  {
    keyword: "fried_potatoes",
    name: "Жареная картошка с грибами",
    price: 150,
    category: "main",
    count: "250 г",
    image: "https://static.tildacdn.com/tild3634-3565-4130-a662-333831323464/guriya_photo_index_2.jpg",
    kind: "veg"
  },

  // =========================
  // SALADS/STARTERS (6): fish 1, meat 1, veg 4
  // category: "salad"
  // =========================
  {
    keyword: "tuna_salad",
    name: "Салат с тунцом",
    price: 480,
    category: "salad",
    count: "250 г",
    image: "https://avatars.mds.yandex.net/i?id=e8acb5ba38ac4a9ff3315da8543838ccb7df5806-5231667-images-thumbs&n=13",
    kind: "fish"
  },
  {
    keyword: "caesar_chicken",
    name: "Цезарь с цыпленком",
    price: 370,
    category: "salad",
    count: "220 г",
    image: "https://avatars.mds.yandex.net/i?id=cd59c8c517ce588d13ab95285f6229d5a11d89c6-5235840-images-thumbs&n=13",
    kind: "meat"
  },
  {
    keyword: "caprese",
    name: "Капрезе с моцареллой",
    price: 350,
    category: "salad",
    count: "235 г",
    image: "https://avatars.mds.yandex.net/i?id=e09925ca240bd55c35db3a320533d5a7_l-9099802-images-thumbs&n=130",
    kind: "veg"
  },
  {
    keyword: "korean_salad",
    name: "Корейский салат с овощами и яйцом",
    price: 330,
    category: "salad",
    count: "250 г",
    image: "https://avatars.mds.yandex.net/i?id=ac31d48db29b4e8130a1efddddfec0822a698521-10806386-images-thumbs&n=13",
    kind: "veg"
  },
  {
    keyword: "fries_caesar",
    name: "Картофель фри с соусом Цезарь",
    price: 280,
    category: "salad",
    count: "235 г",
    image: "https://burgerclub.kz/image/cache/catalog/DipperCezar-1200x800.jpg",
    kind: "veg"
  },
  {
    keyword: "fries_ketchup",
    name: "Картофель фри с кетчупом",
    price: 260,
    category: "salad",
    count: "235 г",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    kind: "veg"
  },

  // =========================
  // DRINKS (6): cold 3, hot 3
  // =========================
  {
    keyword: "orange_juice",
    name: "Апельсиновый сок",
    price: 120,
    category: "drink",
    count: "300 мл",
    image: "https://images.unsplash.com/photo-1607690506833-498e04ab3ffa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
    kind: "cold"
  },
  {
    keyword: "apple_juice",
    name: "Яблочный сок",
    price: 90,
    category: "drink",
    count: "300 мл",
    image: "https://avatars.mds.yandex.net/i?id=d215f18391cd4507faa149fb6e4303420fa7c4be-16449870-images-thumbs&n=13",
    kind: "cold"
  },
  {
    keyword: "carrot_juice",
    name: "Морковный сок",
    price: 110,
    category: "drink",
    count: "300 мл",
    image: "https://plus.unsplash.com/premium_photo-1726842349081-86a2b7c28bee?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
    kind: "cold"
  },
  {
    keyword: "cappuccino",
    name: "Капучино",
    price: 180,
    category: "drink",
    count: "300 мл",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    kind: "hot"
  },
  {
    keyword: "green_tea",
    name: "Зелёный чай",
    price: 100,
    category: "drink",
    count: "300 мл",
    image: "https://avatars.mds.yandex.net/i?id=7cec89a200a642da0fb76bbdd13db1732d4968ce-5887979-images-thumbs&n=13",
    kind: "hot"
  },
  {
    keyword: "black_tea",
    name: "Чёрный чай",
    price: 90,
    category: "drink",
    count: "300 мл",
    image: "https://avatars.mds.yandex.net/i?id=22b921d51d815740d1088daff76532a7673f62f1-4269827-images-thumbs&n=13",
    kind: "hot"
  },

  // =========================
  // DESSERTS (6): small 3, medium 2, big 1
  // category: "dessert"
  // =========================
  {
    keyword: "baklava",
    name: "Пахлава",
    price: 220,
    category: "dessert",
    count: "300 г",
    image: "https://avatars.mds.yandex.net/i?id=8840236bf3c7a95e1db32d4ead8d8b3199301dcb-12606366-images-thumbs&n=13",
    kind: "small"
  },
  {
    keyword: "cheesecake",
    name: "Чизкейк",
    price: 240,
    category: "dessert",
    count: "125 г",
    image: "https://avatars.mds.yandex.net/i?id=42b92aedf02fa0a735b8e0ee9da7ec56aaf1c7c1-2359126-images-thumbs&n=13",
    kind: "small"
  },
  {
    keyword: "choco_cheesecake",
    name: "Шоколадный чизкейк",
    price: 260,
    category: "dessert",
    count: "125 г",
    image: "https://avatars.mds.yandex.net/i?id=2670ad183ab22da4ef954042e5a4c389fc12688a-3631034-images-thumbs&n=13",
    kind: "small"
  },
  {
    keyword: "choco_cake",
    name: "Шоколадный торт",
    price: 270,
    category: "dessert",
    count: "140 г",
    image: "https://avatars.mds.yandex.net/i?id=9cdf5a91d7870a5249a55d037db613744d61c698-5281716-images-thumbs&n=13",
    kind: "medium"
  },
  {
    keyword: "donuts_3",
    name: "Пончики (3 штуки)",
    price: 410,
    category: "dessert",
    count: "350 г",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    kind: "medium"
  },
  {
    keyword: "donuts_6",
    name: "Пончики (6 штук)",
    price: 650,
    category: "dessert",
    count: "700 г",
    image: "https://avatars.mds.yandex.net/i?id=11555f25e9f8b89b64b9dd3a0785d5cefde00a9f-3101375-images-thumbs&n=13",
    kind: "big"
  }
];

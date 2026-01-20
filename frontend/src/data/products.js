export function getProduct(productId){
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products = [
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal (2).jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 79900,
    keywords: ["tshirts", "apparel", "mens"]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/2-slot-toaster-white.jpg",
    name: "2 Slot Toaster - White",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 189900,
    keywords: ["toaster", "kitchen", "appliances"]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/elegant-white-dinner-plate-set.jpg",
    name: "2 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 59900,
    keywords: ["plates", "kitchen", "dining"]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/3-piece-cooking-set.jpg",
    name: "3 Piece Non-Stick, Black Cooking Pot Set",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 349900,
    keywords: ["kitchen", "cookware"]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/women-plain-cotton-oversized-sweater-gray.jpg",
    name: "Cotton Oversized Sweater - Gray",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 139900,
    keywords: ["sweaters", "apparel"]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-towel-set.jpg",
    name: "2 Piece Luxury Towel Set - White",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 159900,
    keywords: ["bathroom", "washroom", "restroom", "towels", "bath towels"]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-8-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 8 Boxes",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 79900,
    keywords: ["kleenex", "tissues", "kitchen", "napkins"]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-striped-beach-dress.jpg",
    name: "Women's Striped Beach Dress",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 99900,
    keywords: ["robe", "swimsuit", "swimming", "bathing", "apparel"]
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/women-sandal-heels-white-pink.jpg",
    name: "Women's Sandal Heels - Pink",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 109900,
    keywords: ["womens", "shoes", "heels", "sandals"]
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-gold.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 159900,
    keywords: ["accessories", "shades"]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.jpg",
    name: "Blackout Curtains Set - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 159900,
    keywords: ["bedroom", "curtains", "home"]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/women-summer-jean-shorts.jpg",
    name: "Women's Summer Jean Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 69900,
    keywords: ["shorts", "apparel", "womens"]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-steel-hot-water-kettle-white.jpg",
    name: "Electric Hot Water Kettle - White",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 109900,
    keywords: ["water kettle", "appliances", "kitchen"]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 539900,
    keywords: ["shoes", "running shoes", "footwear"]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.jpg",
    name: "Straw Wide Brim Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 29900,
    keywords: ["hats", "straw hats", "summer", "apparel"]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-white.jpg",
    name: "Men's Athletic Sneaker - White",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 209900,
    keywords: ["shoes", "running shoes", "footwear", "mens"]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/men-stretch-wool-sweater-black.jpg",
    name: "Men's Wool Sweater - Black",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 159900,
    keywords: ["sweaters", "apparel"]
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/bathroom-mat.jpg",
    name: "Bathroom Bath Mat 16 x 32 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 19900,
    keywords: ["bathmat", "bathroom", "home"]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/women-knit-ballet-flat-white.jpg",
    name: "Women's Ballet Flat - White",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 159900,
    keywords: ["shoes", "flats", "womens", "footwear"]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-gray.jpg",
    name: "Men's Golf Polo Shirt - Gray",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 109900,
    keywords: ["tshirts", "shirts", "apparel", "mens"]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/laundry-detergent-tabs.jpg",
    name: "Laundry Detergent Tabs, 50 Loads",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 29900,
    keywords: ["bathroom", "cleaning"]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-leaf-branch-earrings.jpg",
    name: "Sterling Silver Leaf Branch Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 39900,
    keywords: ["jewelry", "accessories", "womens"]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-gray-queen.jpg",
    name: "Duvet Cover Set, Diamond Pattern",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 439900,
    keywords: ["bedroom", "bed sheets", "sheets", "covers", "home"]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-knit-beanie-pom-pom-blue.jpg",
    name: "Women's Knit Winter Beanie - Blue",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 99900,
    keywords: ["hats", "winter hats", "beanies", "apparel", "womens"]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Chino Pants - Beige",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 129900,
    keywords: ["pants", "apparel", "mens"]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-black.jpg",
    name: "Men's Navigator Sunglasses",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 269900,
    keywords: ["sunglasses", "glasses", "accessories", "shades"]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/men-brown-flat-sneakers.jpg",
    name: "Men's Brown Flat Sneakers",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 249900,
    keywords: ["footwear", "men", "sneakers"]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/non-stick-cooking-set-4-pieces.jpg",
    name: "Non-Stick Cook Set With Lids - 4 Pieces",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 749900,
    keywords: ["cooking set", "kitchen"]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-pink.jpg",
    name: "Vanity Mirror with LED Lights - Pink",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 59900,
    keywords: ["bathroom", "washroom", "mirrors", "home"]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-relaxed-lounge-pants-pink.jpg",
    name: "Women's Relaxed Lounge Pants - Pink",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 139900,
    keywords: ["pants", "apparel", "womens"]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/crystal-zirconia-stud-earrings-pink.jpg",
    name: "Crystal Zirconia Stud Earrings - Pink",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 69900,
    keywords: ["accessories", "womens"]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/glass-screw-lid-food-containers.jpg",
    name: "Glass Screw Lid Containers - 3 Pieces",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 39900,
    keywords: ["food containers", "kitchen"]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/black-and-silver-espresso-maker.jpg",
    name: "Black and Silver Espresso Maker",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 829900,
    keywords: ["espresso makers", "kitchen", "appliances"]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-set-teal.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Teal",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 59900,
    keywords: ["bedroom", "home", "curtains"]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/bath-towel-set-gray-rosewood.jpg",
    name: "Bath Towels 2 Pack - Gray, Rosewood",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 59900,
    keywords: ["bathroom", "home", "towels"]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/athletic-skateboard-shoes-gray.jpg",
    name: "Athletic Skateboard Shoes - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 339900,
    keywords: ["shoes", "running shoes", "footwear"]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-push-blender-black.jpg",
    name: "Countertop Push Blender - Black",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 269900,
    keywords: ["food blenders", "kitchen", "appliances"]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-hoodie-light-teal.jpg",
    name: "Men's Fleece Hoodie - Light Teal",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 79900,
    keywords: ["sweaters", "hoodies", "apparel", "mens"]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/artistic-bowl-set-6-piece.jpg",
    name: "Artistic Bowl and Plate Set - 6 Pieces",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 109900,
    keywords: ["bowls set", "kitchen"]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-8-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 8 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 29900,
    keywords: ["kitchen", "kitchen towels", "tissues"]
  },
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 39900,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 109900,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2f",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 79900,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9ade",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 189900,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534c",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 109900,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c54",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 349900,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98e",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 139900,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a05",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 209900,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545ba",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 59900,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769b",
    image: "images/products/knit-athletic-sneakers-gray (2).jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 339900,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d8",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 79900,
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4b",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 159900,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651359",
    image: "images/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 249900,
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf96a",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 59900,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cda",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 69900,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ecf",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 109900,
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7e",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 39900,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be011",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 19900,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e3",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 79900,
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c86",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 139900,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4b",
    image: "images/products/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 59900,
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc570",
    image: "images/products/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 159900,
    keywords: [
      "shoes",
      "flats",
      "womens",
      "footwear"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d5",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 109900,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb5850",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 829900,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100d",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 139900,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640504",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 59900,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b1",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 129900,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432537",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 189900,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53d",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 169900,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c65",
    image: "images/products/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 379900,
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8e",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 69900,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d8",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 139900,
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cc",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 39900,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a1",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 29900,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a525",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 229900,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdaf",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 39900,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bcf",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 29900,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a2",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 339900,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113e",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 169900,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e28",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 89900,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d80",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 9900,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a956",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 209900,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ]
  }
];
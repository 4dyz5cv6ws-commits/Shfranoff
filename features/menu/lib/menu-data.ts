import { MenuCategory, MenuItem } from '../types';

// Эти данные используются ТОЛЬКО для сидирования БД (см. prisma/seed.ts).
// В рантайме меню читается из Postgres через getMenu() — см. get-menu.ts.

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    slug: 'ognennoe',
    title: 'На углях',
    description: 'Мангал во всю стену — мясо и овощи на живом огне'
  },
  {
    slug: 'kholodnye-zakuski',
    title: 'Холодные закуски',
    description: 'С акцентом на местные и восточные продукты'
  },
  {
    slug: 'supy',
    title: 'Супы',
    description: 'Наваристые, на крепких бульонах'
  },
  {
    slug: 'plov-i-risovoe',
    title: 'Плов и рисовое',
    description: 'Шафран, зира, барбарис — классика с характером'
  },
  {
    slug: 'ryba',
    title: 'Рыба',
    description: 'Байкальский омуль и морская рыба'
  },
  {
    slug: 'deserty',
    title: 'Десерты',
    description: 'Лёгкие, без лишней сладости'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'lamb-saffron',
    categorySlug: 'ognennoe',
    name: 'Баранина на углях с шафраном',
    description: 'Маринад на шафране и топлёном масле, подача с печёным луком',
    price: 890,
    weightGrams: 280,
    image: '/images/dish-lamb.jpg',
    spiceLevel: 1,
    tags: ['хит', 'на углях']
  },
  {
    id: 'shashlik-veal',
    categorySlug: 'ognennoe',
    name: 'Шашлык из телятины',
    description: 'Классический маринад на луке, уголь из березы',
    price: 760,
    weightGrams: 250,
    image: '/images/dish-veal.jpg',
    spiceLevel: 0,
    tags: ['на углях']
  },
  {
    id: 'grilled-vegetables',
    categorySlug: 'ognennoe',
    name: 'Овощи гриль с айраном',
    description: 'Баклажан, перец, томат, соус на кислом молоке',
    price: 420,
    weightGrams: 300,
    image: '/images/dish-vegetables.jpg',
    spiceLevel: 0,
    tags: ['на углях']
  },
  {
    id: 'khumus-baranina',
    categorySlug: 'kholodnye-zakuski',
    name: 'Хумус с бараньей пастромой',
    description: 'Домашний хумус, вяленое мясо, кедровый орех',
    price: 480,
    weightGrams: 220,
    image: '/images/dish-hummus.jpg',
    spiceLevel: 1
  },
  {
    id: 'salat-granat',
    categorySlug: 'kholodnye-zakuski',
    name: 'Салат с гранатом и грецким орехом',
    description: 'Свекла, руккола, сыр сулугуни, гранатовый соус',
    price: 390,
    weightGrams: 200,
    image: '/images/dish-pomegranate-salad.jpg',
    spiceLevel: 0,
    tags: ['новинка']
  },
  {
    id: 'shurpa',
    categorySlug: 'supy',
    name: 'Шурпа на баранине',
    description: 'Наваристый бульон, овощи, зелень',
    price: 450,
    weightGrams: 350,
    image: '/images/dish-shurpa.jpg',
    spiceLevel: 1,
    tags: ['хит']
  },
  {
    id: 'lagman',
    categorySlug: 'supy',
    name: 'Лагман',
    description: 'Тянутая лапша, говядина, острый соус чили',
    price: 480,
    weightGrams: 380,
    image: '/images/dish-lagman.jpg',
    spiceLevel: 2
  },
  {
    id: 'plov-aiva',
    categorySlug: 'plov-i-risovoe',
    name: 'Плов с айвой и барбарисом',
    description: 'Баранина, шафрановый рис, айва, барбарис',
    price: 540,
    weightGrams: 320,
    image: '/images/dish-plov.jpg',
    spiceLevel: 1,
    tags: ['хит']
  },
  {
    id: 'risotto-tykva',
    categorySlug: 'plov-i-risovoe',
    name: 'Ризотто с тыквой и шафраном',
    description: 'Кремовый рис карнароли, тыква, пармезан',
    price: 510,
    weightGrams: 280,
    image: '/images/dish-risotto.jpg',
    spiceLevel: 0,
    tags: ['новинка']
  },
  {
    id: 'omul-smoked',
    categorySlug: 'ryba',
    name: 'Омуль холодного копчения',
    description: 'Байкальский омуль, картофель, укропное масло',
    price: 620,
    weightGrams: 240,
    image: '/images/dish-omul.jpg',
    spiceLevel: 0,
    tags: ['хит']
  },
  {
    id: 'sibas-grill',
    categorySlug: 'ryba',
    name: 'Сибас на углях',
    description: 'Целиком, с лимоном и травами',
    price: 890,
    weightGrams: 350,
    image: '/images/dish-sibas.jpg',
    spiceLevel: 0,
    tags: ['на углях']
  },
  {
    id: 'baklava',
    categorySlug: 'deserty',
    name: 'Пахлава с шафрановым мёдом',
    description: 'Слоёное тесто, орехи, мёд с нитями шафрана',
    price: 320,
    weightGrams: 120,
    image: '/images/dish-baklava.jpg',
    spiceLevel: 0,
    tags: ['хит']
  },
  {
    id: 'panna-cotta',
    categorySlug: 'deserty',
    name: 'Панна-котта с облепихой',
    description: 'Сливочный десерт, соус из забайкальской облепихи',
    price: 340,
    weightGrams: 150,
    image: '/images/dish-pannacotta.jpg',
    spiceLevel: 0,
    tags: ['новинка']
  }
];

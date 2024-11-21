const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;


app.use(cors());
app.use(express.json());
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))


let products = [
    {
        id: 1,
        title: 'Mustachioed-Pavlo',
        price: 135,
        description: 'Pavlo sporting a stylish mustache, adding a classic touch to his look.',
        imageUrl: './images/mustachioedPavlo.png',
        Rarity: ['Epic', 'Legendary'],
        age: ['16', '17'],
    },
    {
        id: 2,
        title: 'Bearded-Pavlo',
        price: 111,
        description: 'Pavlo with a well-groomed beard, showcasing a mature appearance.',
        imageUrl: './images/beardedPavlo.png',
        Rarity: ['Rare', 'Legendary'],
        age: ['16', '18'],
    },
    {
        id: 3,
        title: 'Glasses-Pavlo',
        price: 192,
        description: 'Pavlo wearing sunglasses, exuding a cool and mysterious vibe.',
        imageUrl: './images/sunglassesPavlo.png',
        Rarity: ['Rare', 'Epic', 'Legendary'],
        age: ['16', '17', '18'],
    },
    {
        id: 4,
        title: 'Joker-Pavlo',
        price: 162,
        description: 'Pavlo dressed as the Joker, embracing his playful and enigmatic side.',
        imageUrl: './images/jokerPavlo.png',
        Rarity: ['Rare', 'Legendary'],
        age: ['17', '18']
    },
    {
        id: 5,
        title: 'Homo-Pavlo',
        price: 142,
        description: 'Pavlo expressing himself freely with confidence and pride.',
        imageUrl: './images/homoPavlo.jpg',
        Rarity: ['Rare', 'Epic'],
        age: ['16', '17'],
    },
    {
        id: 6,
        title: 'Pro-Pavlo',
        price: 153,
        description: 'Professional Pavlo ready to take on new challenges.',
        imageUrl: './images/proPavlo.jpg',
        Rarity: ['Rare', 'Legendary'],
        age: ['17', '18'],
    },
    {
        id: 7,
        title: 'Hell-Pavlo',
        price: 232,
        description: 'Pavlo with a fiery aura, embodying a fierce and intense persona.',
        imageUrl: './images/hellPavlo.jpg',
        Rarity: ['Epic', 'Legendary'],
        age: ['16', '17'],
    },
    {
        id: 8,
        title: 'CatGod-Pavlo',
        price: 193,
        description: 'Pavlo as a deity of cats, exuding a mystical and whimsical charm.',
        imageUrl: './images/catPavlo.jpg',
        Rarity: ['Rare', 'Epic'],
        age: ['16', '17'],
    },
    {
        id: 9,
        title: 'Pokemon-Pavlo',
        price: 193,
        description: 'Pavlo in a Pokémon-inspired theme, ready for an adventurous journey.',
        imageUrl: './images/pocemonPavlo.jpg',
        Rarity: ['Epic', 'Legendary'],
        age: ['16', '17'],
    },
    {
        id: 10,
        title: 'Smart-Pavlo',
        price: 182,
        description: 'Pavlo looking intellectual and sophisticated, showcasing his smarts.',
        imageUrl: './images/smartPavlo.jpg',
        Rarity: ['Rare', 'Legendary'],
        age: ['16', '18'],
    },
    {
        id: 11,
        title: 'Maniac-Pavlo',
        price: 182,
        description: 'Pavlo with an energetic and intense expression.',
        imageUrl: './images/maniacPavlo.jpg',
        Rarity: ['Rare', 'Epic'],
        age: ['16', '17'],
    },
    {
        id: 12,
        title: 'Sexy-Pavlo',
        price: 182,
        description: 'Pavlo showcasing his confident and charismatic side.',
        imageUrl: './images/samecPavlo.jpg',
        Rarity: ['Epic', 'Legendary'],
        age: ['16', '17'],
    },
    {
        id: 13,
        title: 'Beautiful-Pavlo',
        price: 182,
        description: 'Pavlo highlighting his natural beauty and charm.',
        imageUrl: './images/beautifulPavlo.png',
        Rarity: ['Rare', 'Legendary'],
        age: ['17', '18'],
    },
    {
        id: 14,
        title: 'Anime-Pavlo',
        price: 182,
        description: 'Pavlo transformed into an anime character, embracing pop culture.',
        imageUrl: './images/narutoPavlo.png',
        Rarity: ['Rare', 'Legendary'],
        age: ['16', '17'],
    },
];

app.get('/api/products', (req, res) => {
    const { search, sort, Rarity, age } = req.query;

    let filteredProducts = products;

    if (search) {
        const withoutSpaces = search.trim().toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(withoutSpaces)
        );
    }

    if (Rarity) {
        filteredProducts = filteredProducts.filter(product =>
            product.Rarity.map(r => r.toLowerCase()).includes(Rarity.toLowerCase())
        );
    }

    if (age) {
        filteredProducts = filteredProducts.filter(product =>
            product.age.includes(age)
        );
    }

    if (sort === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    res.json(filteredProducts);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
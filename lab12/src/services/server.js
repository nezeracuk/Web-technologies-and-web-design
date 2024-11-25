const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5005;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';
app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

let users = []
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
        title: 'Veres-Pavlo',
        price: 10000,
        description: 'Pavlo became upgraded version of his mind father - Zenoviy Veres.',
        imageUrl: './images/veres-pavlo.jpg',
        Rarity: ['Legendary'],
        age: ['18'],
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


app.post('/users/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User with this email not defined' });
    }

    console.log(`${email} is trying to sign in`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
        { userId: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    console.log(`Token for user ${email}: ${token}`);

    res.json({
        message: 'You signed in',
        token,
        user: {
            username: user.username,
            email: user.email
        }
    });
});

app.post('/users/signup', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email not defined' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, password: hashedPassword, email };
    users.push(newUser);

    res.status(201).json({
        message: 'User successfully registered',
        user: { username, email },
    });
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token undefined' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Incorrect token' });
        }
        req.user = user;
        next();
    });
};

app.get('/api/protected', authenticateToken, (req, res) => {
    console.log("Access is allowed", req.user.userId);
    res.json({ message: "You can't do this before login. Login first." });
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return res.status(404).json({ message: 'no product' });
    }

    res.json(product);
});

app.post('/users/logout', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/products', (req, res) => {
    const { search, sort, Rarity, age } = req.query;

    let filteredProducts = products;

    if (search) {
        const withoudProbiliv = search.trim().toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(withoudProbiliv)
        );
    }

    if (Rarity) {
        filteredProducts = filteredProducts.filter(product =>
            product.Rarity.toLowerCase() === Rarity.toLowerCase()
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
import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([
        {
            id: 1,
            title: 'Mustachioed-Pavlo',
            price: 135,
            description: 'Pavlo sporting a stylish mustache, adding a classic touch to his look.',
            imageUrl: require('./images/mustachioedPavlo.png'),
            Rarity: 'Epic',
            age: '16',
        },
        {
            id: 2,
            title: 'Bearded-Pavlo',
            price: 111,
            description: 'Pavlo with a well-groomed beard, showcasing a mature appearance.',
            imageUrl: require('./images/beardedPavlo.png'),
            Rarity: 'Epic',
            age: '18',
        },
        {
            id: 3,
            title: 'Glasses-Pavlo',
            price: 192,
            description: 'Pavlo wearing sunglasses, exuding a cool and mysterious vibe.',
            imageUrl: require('./images/sunglassesPavlo.png'),
            Rarity: 'Legendary',
            age: '17',
        },
        {
            id: 4,
            title: 'Joker-Pavlo',
            price: 162,
            description: 'Pavlo dressed as the Joker, embracing his playful and enigmatic side.',
            imageUrl: require('./images/jokerPavlo.png'),
            Rarity: 'Rare',
            age: '17',
        },
        {
            id: 5,
            title: 'Veres-Pavlo',
            price: 10000,
            description: 'Pavlo became upgraded version of his mind father - Zenoviy Veres.',
            imageUrl: require('./images/veres-pavlo.jpg'),
            Rarity: 'Rare',
            age: '16',
        },
        {
            id: 6,
            title: 'Pro-Pavlo',
            price: 153,
            description: 'Professional Pavlo ready to take on new challenges.',
            imageUrl: require('./images/proPavlo.jpg'),
            Rarity: 'Rare',
            age: '18',
        },
        {
            id: 7,
            title: 'Hell-Pavlo',
            price: 232,
            description: 'Pavlo with a fiery aura, embodying a fierce and intense persona.',
            imageUrl: require('./images/hellPavlo.jpg'),
            Rarity: 'Legendary',
            age: '17',
        },
        {
            id: 8,
            title: 'CatGod-Pavlo',
            price: 193,
            description: 'Pavlo as a deity of cats, exuding a mystical and whimsical charm.',
            imageUrl: require('./images/catPavlo.jpg'),
            Rarity: 'Rare',
            age: '18',
        },
        {
            id: 9,
            title: 'Pokemon-Pavlo',
            price: 193,
            description: 'Pavlo in a Pokémon-inspired theme, ready for an adventurous journey.',
            imageUrl: require('./images/pocemonPavlo.jpg'),
            Rarity: 'Legendary',
            age: '16',
        },
        {
            id: 10,
            title: 'Smart-Pavlo',
            price: 182,
            description: 'Pavlo looking intellectual and sophisticated, showcasing his smarts.',
            imageUrl: require('./images/smartPavlo.jpg'),
            Rarity: 'Epic',
            age: '18',
        },
        {
            id: 11,
            title: 'Maniac-Pavlo',
            price: 182,
            description: 'Pavlo with an energetic and intense expression.',
            imageUrl: require('./images/maniacPavlo.jpg'),
            Rarity: 'Epic',
            age: '16',
        },
        {
            id: 12,
            title: 'Sexy-Pavlo',
            price: 182,
            description: 'Pavlo showcasing his confident and charismatic side.',
            imageUrl: require('./images/samecPavlo.jpg'),
            Rarity: 'Legendary',
            age: '17',
        },
        {
            id: 13,
            title: 'Beautiful-Pavlo',
            price: 182,
            description: 'Pavlo highlighting his natural beauty and charm.',
            imageUrl: require('./images/beautifulPavlo.png'),
            Rarity: 'Rare',
            age: '18',
        },
        {
            id: 14,
            title: 'Anime-Pavlo',
            price: 182,
            description: 'Pavlo transformed into an anime character, embracing pop culture.',
            imageUrl: require('../context/images/narutoPavlo.png'),
            Rarity: 'Epic',
            age: '16',
        },
    ]);

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

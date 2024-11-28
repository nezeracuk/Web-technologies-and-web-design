import axios from 'axios';

export const fetchItems = async (searchTerm = '', sortOrder = 'desc', age = '', rarity = '') => {
    const response = await axios.get('http://localhost:5005/api/products', {
        params: {
            search: searchTerm,
            sort: sortOrder === 'asc' ? 'asc' : 'desc',
            age: age,
            rarity: rarity,
        },
    });
    return response;
};
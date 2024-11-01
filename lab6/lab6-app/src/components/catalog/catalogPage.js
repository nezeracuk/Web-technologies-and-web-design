import React, { useContext, useState } from 'react';
import { ItemsContext } from '../../context/itemscontext';
import CatalogItem from './catalogItem/catalogitem';
import InputComponent from './inputComponents/inputcomponent';
import SelectComponent from './selectComponent/selectComponent';
import SortButton from './sortButton/sortbutton';
import '../catalog/catalog.css';

const Catalog = () => {
    const { items } = useContext(ItemsContext);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedRarity, setSelectedRarity] = useState('');

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
        const matchesAge = selectedAge ? item.age === selectedAge : true;
        const matchesRarity = selectedRarity ? item.Rarity === selectedRarity : true;
        return matchesSearch && matchesAge && matchesRarity;
    });

    const sortedItems = filteredItems.sort((a, b) => {
        return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
    });

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleAgeChange = (e) => setSelectedAge(e.target.value);
    const handleRarityChange = (e) => setSelectedRarity(e.target.value);
    const toggleSortOrder = () => setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));

    return (
        <div className="catalog">
            <div className="filters">
                <InputComponent
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name..."
                    className="search-bar"
                />
                <SelectComponent
                    value={selectedAge}
                    onChange={handleAgeChange}
                    className="filter-select"
                    options={[
                        { value: '', label: 'All ages' },
                        { value: '18', label: '18' },
                        { value: '17', label: '17' },
                        { value: '16', label: '16' }
                    ]}
                />
                <SelectComponent
                    value={selectedRarity}
                    onChange={handleRarityChange}
                    className="filter-select"
                    options={[
                        { value: '', label: 'All rarities' },
                        { value: 'Legendary', label: 'Legendary' },
                        { value: 'Epic', label: 'Epic' },
                        { value: 'Rare', label: 'Rare' }
                    ]}
                />


                <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
            </div>
            <div className="catalog-items">
                {sortedItems.length > 0 ? (
                    sortedItems.map((item, index) => (
                        <CatalogItem
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rarity={item.rarity}
                            description={item.description}
                            imageUrl={item.imageUrl}
                        />
                    ))
                ) : (
                    <p>You wrote bullshit</p>
                )}
            </div>
        </div>
    );
};

export default Catalog;
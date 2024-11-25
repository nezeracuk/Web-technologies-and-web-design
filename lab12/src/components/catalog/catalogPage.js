import React, { useState, useEffect, useMemo, useRef } from 'react';
import CatalogItem from './catalogItem/catalogitem';
import { fetchItems } from '../../services/api';
import InputComponent from './inputComponents/inputcomponent';
import SelectComponent from './selectComponent/selectComponent';
import SortButton from './sortButton/sortbutton';
import Loader from '../loader/Loader';
import './catalog.css';

const Catalog = () => {
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedage, setSelectedage] = useState('');
    const [selectedRarity, setSelectedRarity] = useState('');
    const [loading, setLoading] = useState(false);

    const debounceTimeout = useRef(null);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchItems(searchTerm, sortOrder, selectedage, selectedRarity);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleFetchWithDebounce = () => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            fetchData();
        }, 500);
    };


    useEffect(() => {
        handleFetchWithDebounce();


        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchTerm, sortOrder, selectedage, selectedRarity]);


    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
            const matchesage = selectedage ? item.age.includes(selectedage): true;
            const matchesRarity = selectedRarity ? item.Rarity.includes(selectedRarity): true;
            return matchesSearch && matchesage && matchesRarity;
        });
    }, [items, searchTerm, selectedage, selectedRarity]);


    const sortedItems = useMemo(() => {
        return filteredItems.sort((a, b) => {
            return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
        });
    }, [filteredItems, sortOrder]);


    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleageChange = (e) => setSelectedage(e.target.value);
    const handleRarityChange = (e) => setSelectedRarity(e.target.value);
    const toggleSortOrder = () => setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));

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
                    value={selectedage}
                    onChange={handleageChange}
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
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog-items">
                    {sortedItems.length > 0 ? (
                        sortedItems.map((item, index) => (
                            <CatalogItem
                                key={index}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                Rarity={item.Rarity}
                                description={item.description}
                                imageUrl={item.imageUrl}
                            />
                        ))
                    ) : (
                        <p>No items match your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Catalog;

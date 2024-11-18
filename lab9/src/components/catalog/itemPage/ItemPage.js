import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../../context/itemscontext';
import { fetchItemById } from '../../../services/api';
import './itemCatalog.css';
import SelectComponent from "../selectComponent/selectComponent";

const ItemPage = () => {
    const { id } = useParams();
    const { items } = useContext(ItemsContext);
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const contextItem = items.find(contextItem => contextItem.id === parseInt(id));

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                console.log(`Fetching item with ID: ${id}`);

                const response = await fetchItemById(id);
                const apiData = response.data;

                if (contextItem) {
                    apiData.imageUrl = contextItem.imageUrl;
                }

                if (isMounted) {
                    setItem(apiData);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <div className="item-page">
            <div className="item-image-container">
                <img src={item.imageUrl} alt={item.title} className="item-image" />
                <p className="price">Price: ${item.price.toFixed(2)}</p>
            </div>
            <div className="item-details">
                <div className="characteristics">
                    <span className="characteristic">Rarity: {item.Rarity || 'Not specified'}</span>
                    <span className="characteristic">Age: {item.age || 'Not specified'}</span>
                </div>
                <h1>{item.title}</h1>
                <p className="description">{item.description}</p>
                <div className="countable-field">
                    <label>Count</label>
                    <input type="number" min="1" defaultValue={1} />
                </div>
                <div className="countable-field">
                    <SelectComponent
                        className="filter-select"
                        options={[
                            { value: '', label: 'Select size' },
                            { value: 'XL', label: 'XL' },
                            { value: 'L', label: 'L' },
                            { value: 'M', label: 'M' },
                            { value: 'S', label: 'S' },
                            { value: 'XS', label: 'XS' }
                        ]}
                    />
                </div>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
                    <button className="add-to-cart-button">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;

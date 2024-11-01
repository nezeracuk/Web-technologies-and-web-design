import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../../context/itemscontext';
import './itemCatalog.css';

const ItemPage = () => {
    const { id } = useParams();
    const { items } = useContext(ItemsContext);
    const navigate = useNavigate();

    const item = items.find(item => item.id === parseInt(id));
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
                    <span className="characteristic">Age: {item.age}</span>
                </div>
                <h1>{item.title}</h1>
                <p className="description">{item.description}</p>
                <div className="countable-field">
                    <label>Count</label>
                    <input type="number" min="1" defaultValue={1} />
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
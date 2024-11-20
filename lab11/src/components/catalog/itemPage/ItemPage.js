import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../../context/itemscontext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartAction';
import './itemCatalog.css';

const ItemPage = () => {
    const { id } = useParams();
    const { items } = useContext(ItemsContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedRarity, setSelectedRarity] = useState('');
    const [selectedage, setSelectedage] = useState('');
    const [count, setCount] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5005/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();


                const contextItem = items.find(contextItem => contextItem.id === parseInt(id));
                if (contextItem) {
                    data.imageUrl = contextItem.imageUrl;
                }


                if (!Array.isArray(data.age)) {
                    data.age = [data.age];
                }

                setItem(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, items]);

    const handleAddToCart = () => {
        if (!selectedRarity || !selectedage) {
            alert('Please select both rarity and age');
            return;
        }

        const itemWithSelection = { ...item, selectedRarity, selectedage, count };
        dispatch(addToCart(itemWithSelection));
        navigate('/cart');
    };

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
                    <span className="characteristic">
                        Rarity:
                        <select className='characteristic2' value={selectedRarity} onChange={(e) => setSelectedRarity(e.target.value)}>
                            <option value="">Select rarity</option>
                            {Array.isArray(item.Rarity) && item.Rarity.map((rarity, index) => (
                                <option key={index} value={rarity}>
                                    {rarity}
                                </option>
                            ))}
                        </select>
                    </span>
                    <span className="characteristic">
                        Age:
                        <select className='characteristic2' value={selectedage} onChange={(e) => setSelectedage(e.target.value)}>
                            <option value="">Select age</option>
                            {Array.isArray(item.age) && item.age.map((age, index) => (
                                <option key={index} value={age}>
                                    {age}
                                </option>
                            ))}
                        </select>
                    </span>
                </div>
                <h1>{item.title}</h1>
                <p className="description">{item.description}</p>
                <div className="countable-field">
                    <label>Count</label>
                    <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    />
                </div>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;

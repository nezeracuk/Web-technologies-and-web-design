import React, { useContext, useState } from 'react';
import { ItemsContext } from '../../../context/itemscontext';
import ViewMoreButton from '../viewButton/viewButton';
import CatalogItem from '../../catalog/catalogItem/catalogitem';
import '../pavlo/new.css';

const NewArrivals = () => {
    const { items } = useContext(ItemsContext);
    const [visibleItems, setVisibleItems] = useState(6);

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6);
    };

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">My honey Pavlo</h2>
            <div className="pavlo-grid">
                {items.slice(0, visibleItems).map((pavlo) => (
                    <CatalogItem
                        key={pavlo.id}
                        id={pavlo.id}
                        title={pavlo.title}
                        price={pavlo.price}
                        description={pavlo.description}
                        imageUrl={pavlo.imageUrl}
                        size={pavlo.size}
                    />
                ))}
            </div>
            {visibleItems < items.length && (
                <ViewMoreButton onClick={handleViewMore} />
            )}
        </section>
    );
};

export default NewArrivals;
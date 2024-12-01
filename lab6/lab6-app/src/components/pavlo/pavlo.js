import React from 'react';
import '../pavlo/new.css';

const NewArrivals = () => {
    const cameras = [
        { id: 1, name: "Павло",price: "$102", image: require('../../images/mustachioed_pavlo.jpg') },
        { id: 2, name: "Павло хMaxPro 15",price: "$40000", image: require('../../images/pro_pavlo.jpg') },
        { id: 3, name: "Павлік",price: "$180", image: require('../../images/bearded_pavlo.jpg') },
        { id: 4, name: "Пашок",price: "$134", image: require('../../images/glasses_pavlo.jpg') },
        { id: 5, name: "Пашлейка",price: "$121", image: require('../../images/joker_pavlo.jpg') },
        { id: 6, name: "Пішон",price: "$100", image: require('../../images/catPavlo.jpg') }
    ];

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">Наші пропозиції</h2>
            <div className="pavlo-grid">
                {cameras.map(shoe => (
                    <div key={shoe.id} className="pavlo-block">
                        <img src={shoe.image} alt={shoe.name} className="pavlo-image" />
                        <p className="pavlo-name">{shoe.name}</p>
                        <p className="pavlo-price">{shoe.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
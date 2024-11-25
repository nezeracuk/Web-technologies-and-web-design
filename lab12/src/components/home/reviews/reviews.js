import React from 'react';
import './reviews.css';

const commentsData = [
    {
        name: 'Nazarii Skibytskyi',
        rating: 10,
        comment: "I've been wanting a tame Pavlo for a long time, but I couldn't find a store worthy of my attention, but this wonderful store “Pavlo Shop” came to the rescue",
    },
    {
        name: 'Solovei Vilen',
        rating: 9,
        comment: "I remember a child...",
    },
    {
        name: 'Hrynkiv Maksym',
        rating: 8,
        comment: "I always wanted a Pavlo, but I found a Mandarin...",
    },
];

const Comments = () => {
    return (
        <div className="comments-container">
            <h2>Reviews</h2>
            <p>Thanks Pavlo for sending photos for this website!</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {commentsData.map((currentComment, index) => (
                    <div className="comments-box" key={index}>
                        <div className="box-top">
                            <div className="profile">
                                <div className="profile-info">
                                    <div className="name-user">
                                        <strong>{currentComment.name}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="client-comments">
                                <p>{`“${currentComment.comment}”`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../reviews/reviews.css';

const commentsData = [
    {
        name: 'Назарій Скібицький',
        rating: 10,
        comment: 'Я давно хотів собі ручного Павла, але не міг знайти магазин вартий моєї уваги, але на допомогу прийшов цей чудовий магазин "Pavlo Shop"',
    },
    {
        name: 'Соловей Вілен',
        rating: 9,
        comment: "Я згадую дитину...",
    },
    {
        name: 'Гриньків Максим',
        rating: 8,
        comment: "Завжди хотів собі Павла, але знайшов Мандарин...",
    },
];

const Comments = () => {
    return (
        <div className="comments-container">
            <h2>Відгуки наших клієнтів</h2>
            <p>Дякуємо за ваші відгуки, ми стараємось бути найкращими!</p>

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

            <div className="arrows">
                <button className="arrow-btn left-arrow" disabled>
                    <FaArrowLeft />
                </button>
                <button className="arrow-btn right-arrow" disabled>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Comments;
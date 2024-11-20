import React from 'react';
import PropTypes from 'prop-types';
import './errorMessage.css'; // Додаткові стилі для помилок

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Якщо немає повідомлення, нічого не рендеримо

    return (
        <div className="error-message">
            {message}
        </div>
    );
};

// Визначення типів пропсів для компоненту
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired, // Повідомлення повинно бути рядком
};

export default ErrorMessage;

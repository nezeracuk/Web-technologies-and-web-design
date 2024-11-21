import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartAction';
import './checkout.css';

const CheckoutSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(20, 'First name must be less than 20 characters')
        .matches(/^[a-zA-Z, а-яА-ЯЄєїЇІіґҐ]+$/, 'First name can only contain letters')
        .required('First name is required'),
    lastName: Yup.string()
        .max(20, 'Last name must be less than 20 characters')
        .matches(/^[a-zA-Z, а-яА-ЯЄєїЇІіґҐ]+$/, 'Last name can only contain letters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required')
        .matches(
            /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
            'Email must contain a dot'
        ),
    phone: Yup.string()
        .matches(/^\+?[0-9]{10,14}$/, 'Phone number must be valid')
        .required('Phone number is required'),
    address: Yup.string()
        .max(100, 'Address cannot exceed 100 characters')
        .required('Address is required'),
    comments: Yup.string()
        .max(200, 'Comments cannot exceed 200 characters'),
    country: Yup.string()
        .required('Country is required'),
    deliveryMethod: Yup.string()
        .required('Delivery method is required'),
    confirmation: Yup.bool()
        .oneOf([true], 'You must confirm your details before submitting')
        .required('Confirmation is required'),
});

const InputField = ({ id, name, type = 'text', placeholder }) => (
    <div className="form-field">
        <label htmlFor={id}>{name}</label>
        <Field
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete="on"
        />
        <ErrorMessage name={name} component="div" className="error-message" />
    </div>
);

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        resetForm();
        navigate('/success');
        dispatch(clearCart());


    };

    return (
        <div className="checkout-container">
            <h1>Checkout Page</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    comments: '',
                    country: '',
                    deliveryMethod: '',
                    confirmation: false,
                }}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => (
                    <Form>
                        <InputField
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                        />

                        <InputField
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                        />

                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                        />

                        <InputField
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1234567890"
                        />

                        <InputField
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                        />

                        <div className="form-field">
                            <label htmlFor="country">Country</label>
                            <Field
                                as="select"
                                id="country"
                                name="country"
                                className="checkout-select"
                            >
                                <option value="" label="Select your country"/>
                                <option value="UA" label="Ukraine"/>
                                <option value="USA" label="United States"/>
                                <option value="Canada" label="Canada"/>
                                <option value="UK" label="United Kingdom"/>
                                <option value="Germany" label="Germany"/>
                                <option value="France" label="France"/>
                            </Field>
                            <ErrorMessage name="country" component="div" className="error-message" />
                        </div>

                        <div className="form-field">
                            <label htmlFor="deliveryMethod">Delivery Method</label>
                            <Field
                                as="select"
                                id="deliveryMethod"
                                name="deliveryMethod"
                                className="checkout-select"
                            >
                                <option value="" label="Select delivery method" />
                                <option value="Standard" label="Nova poshta" />
                                <option value="Express" label="Ukrposhta" />
                                <option value="Pickup" label="Meest" />
                            </Field>
                            <ErrorMessage name="deliveryMethod" component="div" className="error-message" />
                        </div>

                        <div className="form-field">
                            <label htmlFor="comments">Comments</label>
                            <Field
                                id="comments"
                                name="comments"
                                component="textarea"
                                placeholder="Enter any additional comments"
                                rows="4"
                                className="checkout-textarea"
                            />
                            <ErrorMessage name="comments" component="div" className="error-message" />
                        </div>

                        <div className="form-field">
                            <label>
                                <Field type="checkbox" name="confirmation" className="checkout-checkbox" />
                                I confirm that my details are correct
                            </label>
                            <ErrorMessage name="confirmation" component="div" className="error-message" />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="submit-button">Submit</button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="reset-button"
                            >
                                Reset
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutPage;

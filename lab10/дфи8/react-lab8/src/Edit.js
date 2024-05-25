import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileForm() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        validateForm();
    }, [firstName, middleName, lastName, birthdate, address]);

    const validateForm = () => {
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = 'Имя обязательно';
        }

        if (!middleName.trim()) {
            errors.middleName = 'Отчество обязательно';
        }

        if (!lastName.trim()) {
            errors.lastName = 'Фамилия обязательна';
        }

        if (birthdate && !/^\d{2}\.\d{2}\.\d{4}$/.test(birthdate)) {
            errors.birthdate = 'Неправильный формат даты (ДД.ММ.ГГГГ)';
        }

        setErrors(errors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return ( <
            form onSubmit = { handleSubmit } >
            <
            div >
            <
            label > Фамилия: < /label> <
            input type = "text"
            value = { lastName }
            onChange = {
                (e) => setLastName(e.target.value) }
            /> {
                errors.lastName && < span > { errors.lastName } < /span>} <
                    /div> <
                    div >
                    <
                    label > Имя: < /label> <
                    input
                type = "text"
                value = { firstName }
                onChange = {
                    (e) => setFirstName(e.target.value) }
                /> {
                    errors.firstName && < span > { errors.firstName } < /span>} <
                        /div> <
                        div >
                        <
                        label > Отчество: < /label> <
                        input
                    type = "text"
                    value = { middleName }
                    onChange = {
                        (e) => setMiddleName(e.target.value) }
                    /> {
                        errors.middleName && < span > { errors.middleName } < /span>} <
                            /div> <
                            div >
                            <
                            label > Дата рождения: < /label> <
                            input
                        type = "text"
                        value = { birthdate }
                        onChange = {
                            (e) => setBirthdate(e.target.value) }
                        /> {
                            errors.birthdate && < span > { errors.birthdate } < /span>} <
                                /div> <
                                div >
                                <
                                label > Адрес: < /label> <
                                input
                            type = "text"
                            value = { address }
                            onChange = {
                                (e) => setAddress(e.target.value) }
                            /> <
                            /div> <
                            button type = "submit" > Сохранить < /button> <
                                /form>
                        );
                    }

                    export default ProfileForm;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get('http://localhost:8080')
            .then((res) => {
                if (res.data.Status === 'Exito') {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = () => {
        axios
            .get('http://localhost:8080/api/users/logout')
            .then((res) => {
                window.location.reload(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {auth ? (
                <div>
                    <h3>Estas autorizado --- {name}</h3>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <div>
                    <h3>{message}</h3>
                    <h3>Ingresa</h3>
                    <Link to="/ingresar">Ingresar</Link>
                </div>
            )}
        </div>
    );
};

export default Home;

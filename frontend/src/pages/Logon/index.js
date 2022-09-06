import React, { useState } from "react";
import { FiLogIn } from 'react-icons/fi'

import api from "../../services/api";

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { Link, useNavigate } from "react-router-dom";

export default function Logon() {
    const [id, setId] = useState('')
    const navegate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            navegate('/profile')
        } catch(err) {
            alert('Falha no login, tente novamente')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero" />

                <form onSubmit={handleLogin}  >
                    <h1>Faça seu logon</h1>

                    <input 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="Sua ID" />
                    <button className="button" type="submit" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
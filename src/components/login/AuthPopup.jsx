import React, { Component } from 'react';
import './AuthPopup.css'; // Импорт стилей для popup

class AuthPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            errorMessage: ''
        };

        this.handleLogin = props.handleLogin
    }

    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Здесь можно добавить обработку логики авторизации
        if (!this.state.username || !this.state.password) {
            this.setState({ errorMessage: 'Пожалуйста, заполните все поля' });
        } else {
            console.log(this.state.username);
            this.setState({ errorMessage: '' }); 
            const email = this.state.username;
            const password = this.state.password
            this.handleLogin({email, password})
        }
    };

    render() {
        return (
            <div className="auth-popup">
                <form onSubmit={this.handleSubmit} className="auth-form">
                    <h2>Авторизация</h2>
                    {this.state.errorMessage && (
                        <div className="error-message">{this.state.errorMessage}</div>
                    )}
                    <div className="form-group">
                        <label htmlFor="username">Логин:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={this.state.rememberMe}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="rememberMe">Запомнить меня</label>
                    </div>
                    <button type="submit" className="submit-button">Войти</button>
                </form>
            </div>
        );
    }
}

export default AuthPopup;
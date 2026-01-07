import React from 'react';

interface NavbarProps {
    onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
    return (
        <nav className="navbar">
            <div className="logo">A.I. KIDS LABS</div>
            <div className="nav-links">
                <a href="#">Início</a>
                <a href="#">Séries</a>
                <a href="#">Filmes</a>
                <a href="#">Minha Lista</a>
            </div>
            <div className="nav-actions">
                <span className="icon">🔍</span>
                <span className="icon">🔔</span>
                <div className="profile-menu" onClick={onLogout}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User" />
                    {onLogout && <span style={{fontSize: '0.8rem', marginLeft: '5px', cursor: 'pointer'}}>Sair</span>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

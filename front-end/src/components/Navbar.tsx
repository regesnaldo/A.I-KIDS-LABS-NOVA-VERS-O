import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'background-color 0.3s ease',
      backgroundColor: isScrolled ? '#141414' : 'transparent',
      padding: '0 4%'
    }}>
      <div className="navbar-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Logo */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" className="logo" style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#E50914', 
            textDecoration: 'none',
            textShadow: '0 0 10px rgba(229, 9, 20, 0.7)'
          }}>
            A.I. KIDS
          </Link>
          
          <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Início</Link>
            <Link to="/series" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Séries</Link>
            <Link to="/filmes" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Filmes</Link>
            <Link to="/bombando" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Bombando</Link>
            <Link to="/minha-lista" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Minha Lista</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="search-box">
             {/* Placeholder for search */}
             <span style={{ cursor: 'pointer' }}>🔍</span>
          </div>
          
          <div className="profile-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div className="avatar" style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '4px', 
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} color="white" />
            </div>
            <LogOut size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => {
              // Logout logic placeholder
              console.log('Logout clicked');
            }}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

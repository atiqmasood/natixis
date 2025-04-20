import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Header = ({ user, onLogout }) => {
  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <div className="dashboard-header">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="user-avatar">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-gray-500">Here's what's happening today</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="logout-button cursor-pointer"
          aria-label="Logout from the application"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header; 
import { useEffect, useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProtectedData } from '../store/dataSlice';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Header from '../components/Header';
import '../styles/Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const { items, loading, error } = useSelector((state) => state.data);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized card click handler
  const handleCardClick = useCallback((id) => {
    setActiveCard(activeCard === id ? null : id);
  }, [activeCard]);

  useEffect(() => {
    dispatch(fetchProtectedData());
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className={`dashboard-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <div className="max-w-7xl mx-auto">
        <Header user={user} onLogout={logout} />

        {/* Content Section */}
        <div className="dashboard-grid">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <div className="loading-spinner" />
            </div>
          ) : error ? (
            <div className="error-message col-span-full">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            items.length > 0 ? items.map((post) => (
              <Card
                key={post.id}
                post={post}
                isActive={activeCard === post.id}
                onClick={handleCardClick}
              />
            )) : (
              <div className="col-span-full flex justify-center items-center h-64">
                <p className="text-gray-500">No posts available</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);

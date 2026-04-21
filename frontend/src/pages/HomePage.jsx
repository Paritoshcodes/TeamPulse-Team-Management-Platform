import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMemberStats } from '../api/memberApi';

function HomePage() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    uniqueRoles: 0,
    latestAddition: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        setIsLoading(true);
        const data = await fetchMemberStats();
        if (isMounted) {
          setStats(data);
          setError('');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.message ||
              'Unable to fetch dashboard stats. Please ensure backend is running.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page home-page">
      <div className="hero-card slide-up">
        <p className="hero-kicker">Welcome to</p>
        <h2>TeamPulse: Team Management Platform</h2>
        <p className="hero-description">
          Manage your student team members in one place with a clean flow for adding, viewing, and
          exploring complete profiles.
        </p>

        <div className="hero-actions">
          <Link to="/add-member" className="btn btn-primary">
            Add Member
          </Link>
          <Link to="/members" className="btn btn-outline">
            View Members
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="stat-card slide-up">
          <p>Total Members</p>
          <h3>{isLoading ? '...' : stats.totalMembers}</h3>
        </article>
        <article className="stat-card slide-up">
          <p>Unique Roles</p>
          <h3>{isLoading ? '...' : stats.uniqueRoles}</h3>
        </article>
        <article className="stat-card slide-up">
          <p>Latest Addition</p>
          <h3>{isLoading ? '...' : stats.latestAddition?.name || 'No members yet'}</h3>
          {!isLoading && stats.latestAddition?.role && (
            <span className="muted-text">{stats.latestAddition.role}</span>
          )}
        </article>
      </div>

      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}

export default HomePage;

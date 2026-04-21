import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMembers } from '../api/memberApi';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      try {
        setIsLoading(true);
        const data = await fetchMembers();

        if (isMounted) {
          setMembers(data.members || []);
          setError('');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.message ||
              'Unable to fetch members. Please ensure backend is running.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(members.map((member) => member.role).filter(Boolean)));
    return ['All', ...roles];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(normalizedSearch) ||
        member.role.toLowerCase().includes(normalizedSearch);

      const matchesRole = selectedRole === 'All' || member.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [members, searchText, selectedRole]);

  return (
    <section className="page view-members-page">
      <div className="section-header slide-up">
        <h2>Meet Our Team</h2>
        <p className="muted-text">Browse members and filter instantly by name or role.</p>
      </div>

      <div className="toolbar slide-up">
        <input
          type="text"
          placeholder="Live search by name or role..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? <p className="muted-text">Loading members...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!isLoading && !error ? (
        <div className="members-grid">
          {filteredMembers.length ? (
            filteredMembers.map((member) => (
              <article key={member._id} className="member-card card-reveal">
                <img src={member.profileImageUrl} alt={member.name} className="member-image" />
                <div className="member-content">
                  <h3>{member.name}</h3>
                  <p className="role-pill">{member.role}</p>
                  <p className="muted-text">{member.email}</p>
                  <Link to={`/members/${member._id}`} className="btn btn-secondary">
                    View Details
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="muted-text">No members match your current search/filter.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default ViewMembersPage;

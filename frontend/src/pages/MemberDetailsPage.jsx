import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMemberById } from '../api/memberApi';

function MemberDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadMember() {
      try {
        setIsLoading(true);
        const data = await fetchMemberById(id);

        if (isMounted) {
          setMember(data.member);
          setError('');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.response?.data?.message || 'Unable to fetch member details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMember();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <section className="page member-details-page">
        <p className="muted-text">Loading member details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page member-details-page">
        <p className="error-text">{error}</p>
        <Link to="/members" className="btn btn-outline">
          Back to Members
        </Link>
      </section>
    );
  }

  if (!member) {
    return null;
  }

  return (
    <section className="page member-details-page">
      <article className="details-card slide-up">
        <img src={member.profileImageUrl} alt={member.name} className="details-image" />

        <div className="details-content">
          <h2>{member.name}</h2>
          <p className="role-pill">{member.role}</p>

          <div className="details-grid">
            <p>
              <strong>Email:</strong> {member.email}
            </p>
            <p>
              <strong>Contact:</strong> {member.contactNumber}
            </p>
            <p>
              <strong>Year:</strong> {member.year || 'Not specified'}
            </p>
            <p>
              <strong>Department:</strong> {member.department || 'Not specified'}
            </p>
            <p>
              <strong>Skills:</strong> {member.skills || 'Not specified'}
            </p>
            <p>
              <strong>Added On:</strong>{' '}
              {member.createdAt ? new Date(member.createdAt).toLocaleString() : 'Not available'}
            </p>
          </div>

          <div className="bio-wrap">
            <h3>About</h3>
            <p>{member.bio || 'No biography provided.'}</p>
          </div>

          <Link to="/members" className="btn btn-secondary">
            Back to Members
          </Link>
        </div>
      </article>
    </section>
  );
}

export default MemberDetailsPage;

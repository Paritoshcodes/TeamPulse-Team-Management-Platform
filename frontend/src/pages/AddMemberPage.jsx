import { useMemo, useState } from 'react';
import { createMember } from '../api/memberApi';

const initialFormValues = {
  name: '',
  role: '',
  email: '',
  contactNumber: '',
  year: '',
  department: '',
  skills: '',
  bio: '',
  profileImage: null,
};

function AddMemberPage() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const previewUrl = useMemo(() => {
    if (!formValues.profileImage) {
      return '';
    }
    return URL.createObjectURL(formValues.profileImage);
  }, [formValues.profileImage]);

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (name === 'profileImage') {
      setFormValues((prevValues) => ({
        ...prevValues,
        profileImage: files?.[0] || null,
      }));
      return;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!formValues.name.trim()) return 'Name is required.';
    if (!formValues.role.trim()) return 'Role is required.';
    if (!formValues.email.trim()) return 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) return 'Enter a valid email address.';
    if (!formValues.contactNumber.trim()) return 'Contact number is required.';
    if (!formValues.profileImage) return 'Profile image is required.';
    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const payload = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        payload.append(key, value);
      }
    });

    try {
      setIsSubmitting(true);
      await createMember(payload);
      setSuccessMessage('Member added successfully.');
      setFormValues(initialFormValues);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Failed to add member. Please check backend connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page add-member-page">
      <div className="form-card slide-up">
        <h2>Add Team Member</h2>
        <p className="muted-text">Fill in the details and upload a professional profile photo.</p>

        <form onSubmit={handleSubmit} className="member-form" noValidate>
          <label>
            Name *
            <input name="name" value={formValues.name} onChange={handleChange} placeholder="Enter full name" />
          </label>

          <label>
            Role *
            <input name="role" value={formValues.role} onChange={handleChange} placeholder="Frontend Developer" />
          </label>

          <label>
            Email *
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="name@example.com"
              type="email"
            />
          </label>

          <label>
            Contact Number *
            <input
              name="contactNumber"
              value={formValues.contactNumber}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </label>

          <label>
            Year
            <input name="year" value={formValues.year} onChange={handleChange} placeholder="III / IV" />
          </label>

          <label>
            Department
            <input
              name="department"
              value={formValues.department}
              onChange={handleChange}
              placeholder="CSE / IT"
            />
          </label>

          <label>
            Skills
            <input
              name="skills"
              value={formValues.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </label>

          <label>
            About / Bio
            <textarea
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              placeholder="Short introduction about the member"
              rows={4}
            />
          </label>

          <label>
            Profile Image *
            <input name="profileImage" type="file" accept="image/*" onChange={handleChange} />
          </label>

          {previewUrl ? (
            <div className="image-preview-wrap">
              <img src={previewUrl} alt="Preview" className="image-preview" />
            </div>
          ) : null}

          {error ? <p className="error-text">{error}</p> : null}
          {successMessage ? <p className="success-text">{successMessage}</p> : null}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Member'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddMemberPage;

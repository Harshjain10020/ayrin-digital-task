import { useState } from 'react';
import FormField from './FormField.jsx';
import SuccessMessage from './SuccessMessage.jsx';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Technical Support',
  'Feedback',
  'Partnership',
  'Other',
];

const API_BASE = 'http://localhost:3001';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); 
  const [serverErrors, setServerErrors] = useState({});

  const validate = (values = formData) => {
    const newErrors = {};
    const { name, email, subject, message } = values;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    const fieldErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldErrors[fieldName],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setStatus('submitting');
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (res.status === 400) {
        const data = await res.json();
        setServerErrors(data.errors || {});
        setStatus('error');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setServerErrors({});
  };

  if (status === 'success') {
    return <SuccessMessage onReset={handleReset} />;
  }

  const combinedErrors = { ...errors, ...serverErrors };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={combinedErrors.name}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={combinedErrors.email}
        />

        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          error={combinedErrors.subject}
        >
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ width: '100%' }}
          >
            <option value="">Select subject</option>
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Message"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={combinedErrors.message}
        />

        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3001';

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/contact`);
        const data = await res.json();
        setSubmissions(data.submissions || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!submissions.length) return <p>No submissions yet.</p>;

  return (
    <div>
      <h2>Contact Submissions</h2>
      <table
        width="100%"
        border="1"
        cellPadding="8"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.subject}</td>
              <td>{s.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionsList;

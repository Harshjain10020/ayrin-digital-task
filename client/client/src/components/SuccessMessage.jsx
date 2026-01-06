function SuccessMessage({ onReset }) {
  return (
    <div
      style={{
        border: '1px solid #4caf50',
        padding: '1rem',
        borderRadius: '4px',
      }}
    >
      <p>✓ Thank you for your message!</p>
      <p>We'll get back to you soon.</p>
      <button
        type="button"
        style={{ marginTop: '0.5rem' }}
        onClick={onReset}
      >
        Send Another Message
      </button>
    </div>
  );
}

export default SuccessMessage;

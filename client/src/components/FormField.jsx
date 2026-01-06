function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  children,
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={name}
        style={{ display: 'block', marginBottom: '0.25rem' }}
      >
        {label} *
      </label>

      {children ? (
        children
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={4}
          style={{ width: '100%' }}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ width: '100%' }}
        />
      )}

      {error && (
        <div
          style={{
            color: 'red',
            fontSize: '0.8rem',
            marginTop: '0.25rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default FormField;

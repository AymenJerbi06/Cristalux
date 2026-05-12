export default function StatsBar() {
  const stats = [
    { number: 'Tunisia', label: 'Cristalux home base in North Africa' },
    { number: '11', label: 'Featured products in the current catalog' },
  ];

  return (
    <div
      style={{
        borderTop: '1px solid #e8e8e1',
        borderBottom: '1px solid #e8e8e1',
        backgroundColor: '#fff',
        padding: '30px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '0 40px' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#000',
                  lineHeight: 1,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#555',
                  marginTop: '8px',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {stat.label}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div
                style={{
                  width: '1px',
                  height: '60px',
                  background: '#e8e8e1',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

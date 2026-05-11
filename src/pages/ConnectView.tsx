import React from 'react';
import { PORTFOLIO_DATA } from '../../constants';

const ConnectView: React.FC = () => {
  const links = [
    {
      label: 'GITHUB',
      display: 'github.com/Tamizh019',
      href: PORTFOLIO_DATA.github,
    },
    {
      label: 'LINKEDIN',
      display: 'linkedin.com/in/tamizharasan-r',
      href: `https://${PORTFOLIO_DATA.linkedin}`,
    },
    {
      label: 'MAIL',
      display: PORTFOLIO_DATA.email,
      href: `mailto:${PORTFOLIO_DATA.email}`,
    },
  ];

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div className="connect-card">
        <div className="connect-title">Let's connect.</div>
        <p className="connect-sub">
          Open to AI engineering internships, collabs, and interesting builds.
        </p>

        <div className="connect-divider" />

        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="connect-row"
          >
            <span className="connect-label">{link.label}</span>
            <span className="connect-value">
              {link.display}
              <span className="connect-arrow">→</span>
            </span>
          </a>
        ))}
      </div>

      <div className="connect-footer" style={{ marginTop: 24 }}>
        Based in Chennai · Available from 2026
      </div>
    </div>
  );
};

export default ConnectView;

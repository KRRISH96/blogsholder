import * as React from 'react';
import { useState } from 'react';
import { ImTable } from 'react-icons/im';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { LAYOUT_OPTIONS } from '../../constants';

interface LayoutSwitchProps {
  children: (layout: string) => React.ReactNode;
}

interface LayoutButtonProps {
  children: React.ReactNode;
  layoutPreference: string;
  title: string;
}

function LayoutSwitch({ children }: LayoutSwitchProps) {
  const [activeLayout, setActiveLayout] = useState(LAYOUT_OPTIONS.table);

  const LayoutButton = ({
    children,
    layoutPreference,
    title,
  }: LayoutButtonProps) => (
    <button
      className={`layout-btn ${
        activeLayout === layoutPreference ? 'active' : ''
      }`}
      onClick={() => setActiveLayout(layoutPreference)}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <React.Fragment>
      <div className="layout-switch-container">
        <LayoutButton
          layoutPreference={LAYOUT_OPTIONS.table}
          title="Table Layout"
        >
          <ImTable />
        </LayoutButton>
        <LayoutButton
          layoutPreference={LAYOUT_OPTIONS.grid}
          title="Grid Layout"
        >
          <BsFillGrid3X3GapFill />
        </LayoutButton>
      </div>
      {children(activeLayout)}
    </React.Fragment>
  );
}

export default LayoutSwitch;

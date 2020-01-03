import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button color='violet' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button color='grey' onClick={toggleVisibility} style={{ marginTop: 10 }}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;

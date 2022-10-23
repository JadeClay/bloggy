import * as React from 'react';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={props.link} {...props} />
  ));
  
  function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }
  
    return <MemoryRouter>{children}</MemoryRouter>;
}

export default LinkBehavior;

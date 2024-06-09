// react/src/components/ngAnimateChildren.tsx

import React, { useEffect, useState } from 'react';

interface NgAnimateChildrenProps {
  animateChildren: boolean | string;
  children: React.ReactNode;
}

const NgAnimateChildren: React.FC<NgAnimateChildrenProps> = ({ animateChildren, children }) => {
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (typeof animateChildren === 'string' && animateChildren.length === 0) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(!!animateChildren);
    }
  }, [animateChildren]);

  return (
    <div data-animate-children={shouldAnimate}>
      {children}
    </div>
  );
};

export default NgAnimateChildren;
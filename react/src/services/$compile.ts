// react/src/services/$compile.ts

import { useState, useEffect } from 'react';
import { RootScopeState } from '../hooks/useRootScope';

interface CompileService {
  compile: (element: HTMLElement, scope: RootScopeState) => void;
}

const useCompile = (): CompileService => {
  const compile = (element: HTMLElement, scope: RootScopeState) => {
import ReactDOM from 'react-dom';

const compile = (element: HTMLElement, scope: RootScopeState) => {
  // Create a React component that wraps the element
  const CompiledComponent = () => {
    // Use the scope state to manage the component's state
    const [state, setState] = useState(scope);

    // Effect to update the state when the scope changes
    useEffect(() => {
      setState(scope);
    }, [scope]);

    return (
      <div ref={(el) => el && el.appendChild(element)}>
        {/* Render the element inside the div */}
      </div>
    );
  };

  // Render the React component into the element
  ReactDOM.render(<CompiledComponent />, element);
};
  };

  return {
    compile,
  };
};

export default useCompile;
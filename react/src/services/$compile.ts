// react/src/services/$compile.ts

import { useState, useEffect } from 'react';
import { sanitizeUri } from '../utils/sanitizeUri';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const useCompile = (): CompileService => {
  const compile = (element: HTMLElement, scope: any) => {
import { render } from 'react-dom';
import { createElement } from 'react';

const compile = (element: HTMLElement, scope: any) => {
  // Clear the element's content
  element.innerHTML = '';

  // Create a React element from the scope's component
  const reactElement = createElement(scope.component, scope.props);

  // Render the React element into the element
  render(reactElement, element);
};
  };

  return {
    compile,
  };
};

export default useCompile;
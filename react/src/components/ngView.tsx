// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useRootScope } from '../hooks/useRootScope';
import { fetchTemplate } from '../services/templateService'; // Assuming a service to fetch templates

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  useEffect(() => {
    const fetchAndSetTemplate = async () => {
      try {
        const template = await fetchTemplate();
        setTemplate(template);
        if (onload) {
          onload();
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchAndSetTemplate();
  }, [onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template ? (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default NgView;
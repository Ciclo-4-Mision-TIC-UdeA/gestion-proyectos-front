import { createContext, useContext } from 'react';

export const ProjectQueryContext = createContext(null);

export const useProjectQuery = () => {
  return useContext(ProjectQueryContext);
};

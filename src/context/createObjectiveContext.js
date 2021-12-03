import { createContext, useContext } from 'react';

export const CreateObjectiveContext = createContext(null);

export const useCreateObjective = () => {
  return useContext(CreateObjectiveContext);
};

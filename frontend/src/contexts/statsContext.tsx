import { createContext, FC, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export interface StatsContextProps {
    name?: string;
    children?: any;
  }
  export const StatsContext = createContext({} as any);
  
  export const useStatsContext = () => useContext(StatsContext);

  const StatsContextProvider: FC<StatsContextProps> = ({ children }) => {
    const [stats, setStats] = useState<any[]>([]);

    const updateStats = () => {
        api
          .get("home/stats")
          .then((res) => {
            setStats(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        (async () => {
          updateStats();
        })();
      }, []);
    

    return (
        <StatsContext.Provider
          value={{
            stats,
          }}
        >
          {children}
        </StatsContext.Provider>
      );
};

export default StatsContextProvider;
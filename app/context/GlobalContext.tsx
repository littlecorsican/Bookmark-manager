import { ReactNode, createContext, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  zIndex: 99999
};

interface GlobalContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  toast: (text: string) => void;
}
  
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
  
export function GlobalProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
  
    return (
      <GlobalContext.Provider value={{ loading, setLoading, toast }}>
        <ClipLoader
          color={"#000"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {children}
        <ToastContainer />
      </GlobalContext.Provider>
    );
}
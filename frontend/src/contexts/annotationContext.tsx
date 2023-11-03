import { createContext, useContext } from "react";


export const AnnotationContext = createContext({} as any);

export const useAnnotationContext = () => useContext(AnnotationContext);

export function AnnotationContextProvider({ children }) {

    return(
        <AnnotationContext.Provider 
            value={{
            }}
        >
            {children}
        </AnnotationContext.Provider>
    );
}

export default AnnotationContextProvider;
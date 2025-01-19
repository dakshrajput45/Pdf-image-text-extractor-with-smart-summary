import { createContext,useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({children}) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const [loadingPdf ,setLoadingPdf] = useState(false);
    const [output, setOutput] = useState('');
    const [summary, setSummary] = useState('');
    const [langSelected, setLangSelected] = useState('english');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingImg ,setLoadingImg] = useState(false);

    const value = {
        apiUrl,
        loadingPdf,setLoadingPdf,
        loadingImg,setLoadingImg,
        output,setOutput,
        summary,setSummary,
        loadingSummary,setLoadingSummary,
        langSelected,setLangSelected,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
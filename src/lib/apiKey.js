export const getApiKey = () => localStorage.getItem("apiKey");

export const setApiKey= (key)=>{
    localStorage.setItem('apiKey', key)
}
export default function useToken() {
    const key = 'monitorToken'
    const getToken = () => {
        return sessionStorage.getItem(key)
    }
    const setToken = (val) => {
         sessionStorage.setItem(key,val)
    }
    const removeToken = () => {
        sessionStorage.removeItem(key)
    }
    return {
        getToken,
        setToken,
        removeToken
    }
}
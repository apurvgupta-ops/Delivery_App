export const FetchData = () => {
    const userInfo = localStorage.getItem("user") ? localStorage.getItem("user") : localStorage.clear()

    return userInfo
}
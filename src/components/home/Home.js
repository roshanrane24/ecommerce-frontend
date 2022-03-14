const home = () => {
    return (
        <>
            <h1>Home</h1>
            <h3>
                {localStorage.getItem('user') ? localStorage.getItem('user') : ""}
            </h3>
        </>
    );
}
export default home;

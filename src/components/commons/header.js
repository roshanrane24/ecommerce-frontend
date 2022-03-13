import {Outlet} from 'react-router-dom';
const header = () => {
    return (
        <>
            <h1>Header</h1>
            <Outlet/>
        </>
    );
}

export default header;

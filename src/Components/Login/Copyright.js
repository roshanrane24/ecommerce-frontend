import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

export default (props) => {
    const navigate = useNavigate();
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" onClick={() => navigate('/')}>
                {' EZ-Buy '}
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

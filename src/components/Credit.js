import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SideBar from "./Sidebar";

function Credit() {
    return [
        <SideBar></SideBar>,
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '5%'
        }}>

            <Box sx={{ width: '100%'}}>
                <Typography variant="h5" gutterBottom>
                    Made with heart
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Korakhot
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Suprawich
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Akarima
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Manida
                </Typography>
            </Box>

        </div>
    ]
}

export default Credit
import * as React from 'react';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

export default function SetResponsible() {
    const navigate = useNavigate();
    const [responsible, setResponsible] = useState('');

    return (
        <Container maxWidth="md">
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap:3, height: '100vh' }}>
                <Typography textAlign='center' variant='body1' component='p' gutterBottom>
                    Entrez votre nom complet pour commecer la gestion du flux des espaces sous votre responsabilites
                </Typography>
                <TextField onChange={(event) => setResponsible(event.target.value)} id="outlined-basic" label="Nom Complet" variant="outlined" />
                <Button onClick={() => navigate(`/my-spaces/${responsible.toLowerCase().replaceAll(' ', '')}`)} variant='contained'>Commencer</Button>
            </Box>
        </Container>
    );
}
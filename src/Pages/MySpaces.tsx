import * as React from 'react';
import Container from "@mui/material/Container";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Navigate, useLoaderData, useParams} from "react-router-dom";
import {addSpace, deleteSpace, Space, updateSpace} from '../apis/spacesApi';
import {io, Socket} from 'socket.io-client';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function MySpaces() {
    const spaces = useLoaderData() as Array<Space>;
    const { responsible } = useParams();
    const [data, setData] = useState(spaces);
    const [sector, setSector] = useState('femmes');
    const [spaceName, setSpaceName] = useState('');
    const [socket, setSocket] = useState<Socket<any, any> | null>(null);

    useEffect(() => {
        if(!socket) {
            const newSocket = io('http://localhost:3001');
            setSocket(newSocket);
        }

        return () => {
            socket?.disconnect()
            return;
        };
    }, [socket])

    async function handleAdd() {
        if(responsible) {
            const createdSpace = await addSpace(
                spaceName,
                sector,
                responsible.toLowerCase().replaceAll(' ', '')
            );
            if(createdSpace) {
                setData([
                    ...data,
                    createdSpace,
                ]);
                socket?.emit("change_happened",  'ADDED');
            }
        }
    }

    async function handleDelete(index: number) {
        await deleteSpace(data[index]);
        const dataCopy = [...data];
        dataCopy.splice(index, 1);
        setData(dataCopy);
        socket?.emit("change_happened",  'DELETED');
    }

    async function handleAvailabilityToggle(index: number) {
        const dataCopy = [...data];
        dataCopy[index].available = !data[index].available;
        await updateSpace(data[index], dataCopy[index]);
        setData(dataCopy);
        socket?.emit("change_happened",  'UPDATED');
    }

    if (!responsible) {
        return (<Navigate to="/my-spaces" />)
    }

    return (
        <Container maxWidth="md">
                <Box sx={{ flexGrow: 1, my: 8}}>
                    <Typography textAlign='center' variant='h3' component='h4' gutterBottom>Les Espaces Sous La Responsabilite de {responsible}</Typography>
                    <Box sx={{ display: 'flex', my: 3, justifyContent: 'center', gap:3 }}>
                        <FormControl sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                            <InputLabel id="sector-label" >Secteur</InputLabel>
                            <Select
                                labelId="sector-label"
                                id="sector-select"
                                value={sector}
                                onChange={(event) => setSector(event.target.value)}
                                label="Secteur"
                            >
                                <MenuItem value={"femmes"}>Zone Femmes/Enfants</MenuItem>
                                <MenuItem value={"cardio"}>Zone Cardio et autres</MenuItem>
                                <MenuItem value={"esplanade-top"}>Zone Superieur Esplanade</MenuItem>
                                <MenuItem value={"esplanade-bottom"}>Zone Inferieur Esplanade</MenuItem>
                                <MenuItem value={"tri"}>Zone Tri</MenuItem>
                                <MenuItem value={"pharmacie"}>Zone Pharmacie</MenuItem>
                            </Select>
                            <TextField onChange={(event) => setSpaceName(event.target.value)} id="outlined-basic" label="Espace" variant="outlined" />
                            <Button onClick={handleAdd} variant='contained'>Ajouter</Button>
                        </FormControl>
                    </Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data.filter(e => e.responsible === responsible.toLowerCase().replaceAll(' ', '')).map((space, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Item>
                                    <Typography variant='h4' component='h4' gutterBottom>{space.name}</Typography>
                                    <Button onClick={() => handleAvailabilityToggle(index)} color={!space.available? 'success':'info'}>{!space.available? "Resumer Flux":"Arreter Flux"}</Button>
                                    <Button onClick={() => handleDelete(index)} color='error'>Supprimer</Button>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
        </Container>
    );
}
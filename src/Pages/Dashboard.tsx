import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SpacesTable from "../Components/SpacesTable";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { Space } from "../apis/spacesApi";
import {io, Socket} from "socket.io-client";

export default function Dashboard() {
    const submit = useSubmit();
    const spaces = useLoaderData() as Array<Space>;
    const [socket, setSocket] = useState<Socket<any, any> | null>(null);

    useEffect(() => {
        if(!socket) {
            const newSocket = io('https://spaces-status-server.onrender.com');
            setSocket(newSocket);
            newSocket.on("receive_change", () => {
                submit(null, {
                    action: "/",
                    method: "post",
                });
            });
        }

        return () => {
            socket?.disconnect()
            return;
        };
    }, [socket, submit])

    return (
        <Container maxWidth="md">
        <Box sx={{my: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Le status des espaces de travail de la caravane!
            </Typography>
            <SpacesTable data={spaces}/>
        </Box>
    </Container>
    );
}
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container maxWidth="md">
            <Box sx={{my: 20, textAlign: 'center'}}>
                <Typography variant="h2" component="h1" gutterBottom>Oops!</Typography>
                <Typography variant="body1" component="p" gutterBottom>Sorry, an unexpected error has occurred.</Typography>
                <Typography variant="body2" component="p" gutterBottom><i>{isRouteErrorResponse(error)? error.statusText : 'An Unknown Error Happened!'}</i></Typography>
            </Box>
        </Container>
    );
}
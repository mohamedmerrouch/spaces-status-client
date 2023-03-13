import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import { Space } from '../apis/spacesApi';

interface SpacesTableProps {
    data: Array<Space>;
}
export default function SpacesTable( props : SpacesTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Espace</TableCell>
                        <TableCell align="right">Zone</TableCell>
                        <TableCell align="right">Responsable</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.sort((a, b) => (a.available)? 1:-1).map((space) => (
                        <TableRow
                            key={space.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {space.name}
                            </TableCell>
                            <TableCell align="right">{space.sector}</TableCell>
                            <TableCell align="right">{space.responsible}</TableCell>
                            <TableCell align="right"><CircleIcon color={(space.available? 'success':'error')} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import apiHelper from '../../API/ApiHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export default function Result() {
    const [Result, setResult] = React.useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [error, seterror] = React.useState([])
    const ShowResult = async () => {
        try {
            const result = await apiHelper.FetchData(id)
            if (result && result.status === 200) {
                setResult(result.data.result[0] || [])
            }

        } catch (error) {
            console.log(error)
        }
    }

    const SubjectData = Result?.subject
    const StudentData = Result?.student

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));



    React.useEffect(() => {
        ShowResult()
    }, [])

    return <>
        {
            Result?.student ? <>
                <TableContainer sx={{ width: 600, margin: '4vh auto', border: "none" }} component={Paper}>
                    <Table className='mb-5'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>student</StyledTableCell>
                                <StyledTableCell align="right">std</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={StudentData?.name} >
                                <StyledTableCell component="th" scope="row">
                                    {StudentData?.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{StudentData?.std}</StyledTableCell>

                            </StyledTableRow>
                        </TableBody>
                    </Table>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>subject</StyledTableCell>
                                <StyledTableCell align="right">Marks</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {SubjectData?.map((row) => (
                                <StyledTableRow key={row?.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row?.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row?.marks}</StyledTableCell>

                                </StyledTableRow>
                            ))}


                            <StyledTableRow >
                                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} >Total Marks</StyledTableCell>
                                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} align="right" >{Result?.totalMarks}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} >Archived Marks</StyledTableCell>
                                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} align="right" >{Result?.achievedMarks}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow >
                                <StyledTableCell sx={{ backgroundColor: "green", color: "white" }} >Percentage</StyledTableCell>
                                <StyledTableCell sx={{ backgroundColor: "green", color: "white" }} align="right" >{Math.floor(Result?.percentage)}%</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='row justify-content-center w-100 text-center'>
                    <div className="col-6 col-md-3">
                        <Button variant="contained" className='m-auto' onClick={() => navigate("/")}>Back</Button>
                    </div>
                    <div className="col-6 col-md-3">
                        <Button variant="outlined" className='m-auto' onClick={() => window.print()}>Print</Button>
                    </div>
                </div>
            </> : <h1 className='text-center text-danger'>This Student Result Not Declared</h1>
        }
    </>
}
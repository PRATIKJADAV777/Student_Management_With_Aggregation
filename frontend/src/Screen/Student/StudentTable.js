import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import apiHelper from '../../API/ApiHelper';
export default function StudentTable(props) {
    let { open, setopen, ShowResult,} = props
    const [student, setstudent] = useState({
        name: "",
        std: "",
    })
    const [error, seterror] = useState([])
    const handleClose = () => {
        setopen(false);
        seterror([])
    };

    const AddStudent = async () => {
        try {
            const Result = await apiHelper.AddStudent(student)
            if (Result && Result.status === 200) {
                ShowResult()
                setopen(false)
            }
        } catch (error) {
            console.log(error)
            if (error && error.response && error.response.data.message) {
                seterror(error.response.data.message)
            }
        }
    }
    const HandleValue = (name, e) => {
        student[name] = e.target.value
        setstudent(student)
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose} >
                <center>
                    <DialogTitle>Add Student</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="name"
                        error={error.length > 0}
                        helperText={error}
                        onChange={(e) => { HandleValue(e.target.name, e) }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="STD"
                        type="email"
                        fullWidth
                        name='std'
                        variant="outlined"
                        error={error.length > 0}
                        helperText={error}
                        onChange={(e) => { HandleValue(e.target.name, e) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={AddStudent}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
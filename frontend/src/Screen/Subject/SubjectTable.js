import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import apiHelper from '../../API/ApiHelper';
export default function SubjectTable(props) {
    let { open, setopen, ShowSubject,} = props

    const [subject, setsubject] = useState({
        subject: ""
    })
    const [error, seterror] = useState([])
    const handleClose = () => {
        setopen(false);
        seterror([])

    };
    const HandleValue = (name, e) => {
        subject[name] = e.target.value
        setsubject(subject)
    }
    const AddSubject = async () => {
        try {
            const Result = await apiHelper.AddSubject(subject)
            if (Result && Result.status === 200) {
                setopen(false)
                ShowSubject()
            }
        } catch (error) {
            if (error && error.response && error.response.data.message) {
                seterror(error.response.data.message)
            }
        }
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
                        name="subject"
                        error={error.length > 0}
                        helperText={error}
                        onChange={(e) => { HandleValue(e.target.name, e) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={AddSubject}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
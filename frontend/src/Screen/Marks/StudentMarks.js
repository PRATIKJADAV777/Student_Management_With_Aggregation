import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import apiHelper from '../../API/ApiHelper';
export default function StudentMarks(props) {
    let { openMarks, setopenMarks, subject, selectedSTU } = props
    const [selectSub, setselectSub] = useState({
        student: "",
        subject: "",
        marks: ""
    })
    const [error, seterror] = useState([])
    const handleClose = () => {
        setopenMarks(false);
        setselectSub({
            student: "",
            subject: "",
            marks: ""
        })
        seterror([])
    };
    const HandleValue = (name, e) => {
        selectSub[name] = e.target.value
        setselectSub({ ...selectSub, student: selectedSTU._id })
    }
    const Addmark = async ()=>{
        try {
            const result = await apiHelper.Addmarks(selectSub)
            if(result){
                setselectSub(result)
            }
            setopenMarks(false)
        } catch (error) {
            console.log(error)
            // if (error && error.response && error.response.data && error.response.data.message) {
            //     seterror(error.response.data.message)
            // }
        }
    }
    return (
        <div>
            <Dialog open={openMarks} onClose={handleClose} >
                <center>
                    <DialogTitle>Add Marks : - {selectedSTU.name}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}  
                            label="Subject"
                            onChange={(e) => HandleValue(e.target.name, e)}
                            name='subject'
                            error={error.length > 0}
                        >
                            {
                                subject?.map((x) => (
                                    <MenuItem key={x._id} value={x._id}>{x.subject}</MenuItem>
                                ))
                            }
                            
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Marks"
                        type="email"
                        fullWidth
                        name='marks'
                        variant="outlined"
                        error={error.length > 0}
                        helperText={error}
                        onChange={(e) => { HandleValue(e.target.name, e) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={Addmark}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
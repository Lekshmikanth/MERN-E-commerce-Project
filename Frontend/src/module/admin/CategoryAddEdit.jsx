import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React from 'react'

const CategoryAddEdit = ({ openDialog, setOpenDialog, edit, form, setForm, handleSubmit, handleClose, handleImageChange }) => {
    return (
        <>
            <Dialog open={openDialog} onClose={() => handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{edit ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Category Name"
                        name="name"
                        value={form?.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Grid display={"flex"}>
                        <input
                            type="file"
                            name='image'
                            style={{ width: "200px" }}
                            onChange={(e) => handleImageChange(e, setForm)}
                        />
                        {form?.image && (
                            <img
                                src={
                                    typeof form?.image === 'string'
                                        ? form?.image
                                        : URL.createObjectURL(form?.image)
                                }
                                alt="preview"
                                style={{ width: '100px', height: '100px' }}
                            />
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {edit ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CategoryAddEdit
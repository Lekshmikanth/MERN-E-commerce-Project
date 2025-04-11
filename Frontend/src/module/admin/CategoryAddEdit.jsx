import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'

const CategoryAddEdit = ({ openDialog, setOpenDialog, edit, setEdit, form, setForm, handleChange, handleSubmit, handleImageChange }) => {
  return (
    <>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>{edit ? "Edit Category" : "Add Category"}</DialogTitle>
              <DialogContent>
                  <TextField
                      fullWidth
                      margin="normal"
                      label="Category Name"
                      name="categoryName"
                      value={form?.categoryName}
                      onChange={handleChange}
                  />
                  <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setForm)}
                      style={{ marginTop: 12 }}
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button onClick={handleSubmit} variant="contained">
                      {edit ? "Update" : "Create"}
                  </Button>
              </DialogActions>
          </Dialog>
    </>
  )
}

export default CategoryAddEdit
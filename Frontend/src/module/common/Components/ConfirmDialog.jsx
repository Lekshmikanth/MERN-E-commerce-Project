import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, content, image }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || "Are you sure?"}</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center" mb={2}>
                    {image && <img
                        src={image}
                        alt="preview"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 8 }}
                    />
                    }
                </Box>
                <Typography align="center">{content || "This action cannot be undone."}</Typography>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="error" onClick={onConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;

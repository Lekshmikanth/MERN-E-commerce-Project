import React, { useMemo, useState } from 'react'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../appSlice';
import { notifyError, notifySuccess } from '../common/Notifications/constants';
import ImageCompressor from 'browser-image-compression';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, Grid, IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryAddEdit from './CategoryAddEdit';
import ConfirmDialog from '../common/Components/ConfirmDialog';
import { categoryInitialState } from './constants';

const CategoryListingTable = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [form, setForm] = useState(categoryInitialState);
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    console.log("first", form);

    const onConfirm = () => {
        handleDelete(id);
        setOpen(false);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setForm(categoryInitialState);
    };

    const handleAddNewCategory = () => {
        setOpenDialog(true);
        setEdit(false);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("image", form.image);

        if (edit) {
            try {
                await updateCategory({ id: form?._id, formData }).unwrap();
                setOpenDialog(false);
                setForm(categoryInitialState);
                notifySuccess("Category Updated Successfully");
            } catch {
                notifyError("Failed To Update Category");
            }
        } else {
            try {
                await createCategory(formData).unwrap();
                setOpenDialog(false);
                setForm(categoryInitialState);
                notifySuccess("Category Added Successfully");
            } catch {
                notifyError("Failed To Add Category");
            }
        }
    };

    const handleEdit = (category) => {
        setForm(category);
        setEdit(true);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        try{
        await deleteCategory(id);
        notifySuccess("Deleted Successfully");
        }catch{
            notifyError("Failed To Delete");
        }
    };

    const compressImage = async (file, setForm) => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            const compressedFile = await ImageCompressor(file, options);
            setForm((prevProduct) => ({ ...prevProduct, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed", error);
        }
    };
    // Handle image file selection
    const handleImageChange = (e, setForm) => {
        const file = e.target.files[0];
        if (file) {
            compressImage(file, setForm);
        }
    };

    const handleDeleteConfirm = (id) => {
        setOpen(true);
        setId(id);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "image",
                header: "Image",
                Cell: ({ cell }) => (<img src={cell.getValue()} alt="product" width={50} height={50} style={{ objectFit: "cover", borderRadius: 8 }} />),
                size: 100,
            },
            {
                accessorKey: 'name',
                header: 'Category Name',
                size: 100,
            },
            {
                header: "Actions",
                id: "actions",
                Cell: ({ row }) => (
                    <Grid display={"flex"}>
                        <IconButton color="primary" onClick={() => handleEdit(row?.original)} > <EditIcon /> </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteConfirm(row?.original?._id)} > <DeleteIcon /> </IconButton>
                    </Grid>
                ),
                size: 50,
            },

        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: categories ? categories : "",
        enableColumnActions: false,
        enableHiding: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        initialState: {
            density: 'compact', // options: 'comfortable' | 'compact' | 'spacious'
        },
    });

    return (
        <>
            <h2 style={{ margin: "10px 0px" }}>Admin - Category Management</h2>
            <Grid container sx={{ display: "flex", justifyContent: "end", margin: "15px 0px" }}>
                <Button sx={{ backgroundColor: "#1976D2", color: "white", "&:hover": { backgroundColor: "#318eeb" } }} onClick={() => handleAddNewCategory()}>Add New Category</Button>
            </Grid>
            <MaterialReactTable table={table} />
            <CategoryAddEdit form={form} setForm={setForm} openDialog={openDialog} setOpenDialog={setOpenDialog} handleClose={handleClose} edit={edit} setEdit={setEdit} handleSubmit={handleSubmit} handleImageChange={handleImageChange} />
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                title="Delete Product"
                image="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                content={"Are you sure you want to delete ?"}
            />
        </>
    )
}

export default CategoryListingTable
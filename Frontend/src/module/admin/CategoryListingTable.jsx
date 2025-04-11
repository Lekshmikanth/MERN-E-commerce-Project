import React, { useMemo, useState } from 'react'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../appSlice';
// import { notifyError, notifySuccess } from '../common/Notifications/constants';
import ImageCompressor from 'browser-image-compression';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Grid, IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryAddEdit from './CategoryAddEdit';
import ConfirmDialog from '../common/Components/ConfirmDialog';

const CategoryListingTable = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [form, setForm] = useState({ categoryName: '', image: null, id: null });
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onConfirm = () => {
        handleDelete(id);
        setOpen(false);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", form.categoryName);
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            if (edit) {
                await updateCategory(form).unwrap();
            } else {
                await createCategory(form).unwrap();
            }
            setForm({ name: "", image: null });
            setEdit(false);
            setOpenDialog(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (category) => {
        setForm({ name: category.name, image: null });
        setEdit(true);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await deleteCategory(id);
        }
    };

    const compressImage = async (file, setProduct) => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            const compressedFile = await ImageCompressor(file, options);
            setProduct((prevProduct) => ({ ...prevProduct, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed", error);
        }
    };
    // Handle image file selection
    const handleImageChange = (e, setProduct) => {
        const file = e.target.files[0];
        if (file) {
            compressImage(file, setProduct);
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
                accessorKey: 'categoryName',
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
        initialState: {
            density: 'compact', // options: 'comfortable' | 'compact' | 'spacious'
        },
    });

    return (
        <>
            <h2 style={{ margin: "10px 0px" }}>Admin - Category Management</h2>
            <MaterialReactTable table={table} />
            <CategoryAddEdit openDialog={openDialog} setOpenDialog={setOpenDialog} edit={edit} setEdit={setEdit} handleChange={handleChange} handleSubmit={handleSubmit} handleImageChange={handleImageChange} />
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
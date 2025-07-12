import React, { useMemo, useState } from 'react';
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation
} from '../appSlice';
import { notifyError, notifySuccess } from '../common/Notifications/constants';
import ImageCompressor from 'browser-image-compression';
import {
    MaterialReactTable,
    useMaterialReactTable
} from 'material-react-table';
import {
    Button,
    Grid,
    IconButton
} from '@mui/material';
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
        try {
            await deleteCategory(id);
            notifySuccess("Deleted Successfully");
        } catch {
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
            setForm(prev => ({ ...prev, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed", error);
        }
    };

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

    const columns = useMemo(() => [
        {
            accessorKey: "image",
            header: "Image",
            Cell: ({ cell }) => (
                <img
                    src={`http://localhost:5000/api/products/image/${cell.getValue()}`}
                    alt="category"
                    width={50}
                    height={50}
                    style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #444",
                        backgroundColor: "#fff",
                    }}
                />
            ),
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
                    <IconButton
                        onClick={() => handleEdit(row.original)}
                        sx={{
                            color: "#FF9021",
                            '&:hover': { color: "#cc711a" }
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteConfirm(row.original._id)}
                        sx={{
                            color: "#f44336",
                            '&:hover': { color: "#d32f2f" }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            ),
            size: 50,
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: categories || [],
        enableColumnActions: false,
        enableHiding: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        initialState: {
            density: 'compact',
        },
        muiTablePaperProps: {
            elevation: 3,
            sx: {
                backgroundColor: '#121212',
                borderRadius: 2,
                border: '1px solid #333',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: '#1f1f1f',
                color: '#FF9021',
                fontWeight: 'bold',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                backgroundColor: '#121212',
                color: '#fff',
                borderBottom: '1px solid #333',
            },
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: '#1f1f1f',
                color: '#fff',
                borderTop: '1px solid #333',
                '& .MuiSelect-select': {
                    color: '#fff',
                    backgroundColor: '#2c2c2c',
                },
                '& .MuiTypography-root': {
                    color: '#ccc',
                }
            },
        },
        muiTopToolbarProps: {
            sx: {
                backgroundColor: '#1f1f1f',
                color: '#fff',
                borderBottom: '1px solid #333',
                '& .MuiInputBase-root': {
                    backgroundColor: '#2c2c2c',
                    color: '#fff',
                },
                '& .MuiInputBase-input': {
                    color: '#fff',
                },
                '& .MuiSvgIcon-root': {
                    color: '#FF9021',
                },
            },
        },
        muiSearchTextFieldProps: {
            sx: {
                backgroundColor: '#2c2c2c',
                color: '#fff',
                input: { color: '#fff' },
            },
        },
        muiTableBodyRowProps: {
            sx: {
                '&:hover': {
                    backgroundColor: '#1a1a1a',
                },
            },
        },
    });

    return (
        <>
            <h2 style={{ margin: "10px 0px", color: "#FF9021" }}>
                Admin - Category Management
            </h2>
            <Grid container sx={{ display: "flex", justifyContent: "end", margin: "15px 0px" }}>
                <Button
                    sx={{
                        backgroundColor: "#FF9021",
                        color: "white",
                        "&:hover": { backgroundColor: "#cc711a" }
                    }}
                    onClick={handleAddNewCategory}
                >
                    Add New Category
                </Button>
            </Grid>
            <MaterialReactTable table={table} />
            <CategoryAddEdit
                form={form}
                setForm={setForm}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                handleClose={handleClose}
                edit={edit}
                setEdit={setEdit}
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
            />
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                title="Delete Category"
                image="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                content="Are you sure you want to delete this category?"
            />
        </>
    );
};

export default CategoryListingTable;

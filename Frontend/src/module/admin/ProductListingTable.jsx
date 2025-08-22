import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Grid,
    IconButton,
    Tooltip,
    Box
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ConfirmDialog from '../common/Components/ConfirmDialog';

const ProductListingTable = ({
    products,
    setProduct,
    setAddEditOpen,
    setEdit,
    handleDelete
}) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const handleEdit = (product) => {
        setEdit(true);
        setProduct(product);
        setAddEditOpen(true);
    };

    const handleDeleteConfirm = (id) => {
        setOpen(true);
        setId(id);
    };

    const onConfirm = () => {
        handleDelete(id);
        setOpen(false);
    };

    const columns = useMemo(() => [
        {
            accessorKey: "image",
            header: "Image",
            Cell: ({ cell }) => (
                <img
                    src={`http://localhost:5000/api/products/image/${cell.getValue()}`}
                    alt="product"
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
            accessorKey: "name",
            header: "Name",
            Cell: ({ row }) => {
                const { name, isTrending } = row.original;
                return (
                    <Box display="flex" alignItems="center" gap={1}>
                        <span>{name}</span>
                        {isTrending && (
                            <Tooltip title="Trending" arrow>
                                <WhatshotIcon sx={{ color: "#FF9021" }} />
                            </Tooltip>
                        )}
                    </Box>
                );
            },
            size: 120,
        },
        { accessorKey: 'category', header: 'Category', size: 100 },
        {
            accessorKey: 'price',
            header: 'Price',
            size: 80,
            Cell: ({ cell }) => `₹${cell.getValue()}`,
        },
        { accessorKey: 'quantity', header: 'Quantity', size: 80 },
        {
            header: "Actions",
            id: "actions",
            Cell: ({ row }) => (
                <Grid display="flex">
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => handleEdit(row.original)}
                            sx={{ color: "#FF9021", '&:hover': { color: "#cc711a" } }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={() => handleDeleteConfirm(row.original._id)}
                            sx={{ color: "#f44336", '&:hover': { color: "#d32f2f" } }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            ),
            size: 70,
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: products,
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
            <MaterialReactTable table={table} />
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                title="Delete Product"
                image="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                content="Are you sure you want to delete this product?"
            />
        </>
    );
};

export default ProductListingTable;

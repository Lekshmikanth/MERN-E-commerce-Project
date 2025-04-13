import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { Grid, IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from '../common/Components/ConfirmDialog';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const ProductListingTable = ({ products, setProduct, setAddEditOpen, setEdit, handleDelete }) => {

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

    const columns = useMemo(
        () => [
            {
                accessorKey: "image",
                header: "Image",
                Cell: ({ cell }) => (<img src={cell.getValue()} alt="product" width={50} height={50} style={{ objectFit: "cover", borderRadius: 8 }} />),
                size: 100,
            },
            {
                accessorKey: "name",
                header: "Name",
                Cell: ({ row }) => {
                    const isTrending = row?.original?.isTrending;
                    const name = row?.original?.name;
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span>{name}</span>
                            {isTrending && <WhatshotIcon sx={{ display: "flex" }} color="error" titleAccess="Trending" />}
                        </div>
                    )
                },
                size: 100,
            },
            {
                accessorKey: 'category',
                header: 'Category',
                size: 100,
            },
            {
                accessorKey: 'price',
                header: 'Price',
                size: 100,
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
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
        data: products,
        enableColumnActions: false,
        enableHiding: false,
        enableDensityToggle: false,    // 🚫 removes toggle density button
        enableFullScreenToggle: false,
        initialState: {
            density: 'compact', // options: 'comfortable' | 'compact' | 'spacious'
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
                content={"Are you sure you want to delete ?"}
            />
        </>
    )
};

export default ProductListingTable;

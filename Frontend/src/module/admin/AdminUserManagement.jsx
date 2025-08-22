import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';
import { useGetAllUsersQuery, useMakeUserAdminMutation } from '../appSlice';
import { Button, Chip, Typography } from '@mui/material';
import { notifyError, notifySuccess } from '../common/Notifications/constants';

const AdminUserManagement = () => {
    const { data, isLoading } = useGetAllUsersQuery();
    const [makeUserAdmin] = useMakeUserAdminMutation();

    const handleMakeUserAdmin = async (id, value) => {
        try {
            await makeUserAdmin({ id, value });
            notifySuccess(value ? "User promoted to Admin" : "Admin assigned to User");
        } catch {
            notifyError("Failed to update user role");
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 100,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 100,
            },
            {
                accessorKey: 'isAdmin',
                header: 'Role',
                Cell: ({ cell }) =>
                    cell.getValue() ? (
                        <Chip label="Admin" color="success" />
                    ) : (
                        <Chip label="User" sx={{ backgroundColor: '#424242', color: 'white' }} />
                    ),
                size: 100,
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                Cell: ({ row }) => {
                    const user = row.original;
                    return (
                        !user?.isAdmin ? (
                            <Button
                                size="small"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FF9021',
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#cc711a' },
                                }}
                                onClick={() => handleMakeUserAdmin(user._id, true)}
                            >
                                Make Admin
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                    color: '#FF9021',
                                    borderColor: '#FF9021',
                                    '&:hover': {
                                        borderColor: '#cc711a',
                                        backgroundColor: 'rgba(255, 144, 33, 0.08)',
                                    },
                                }}
                                onClick={() => handleMakeUserAdmin(user._id, false)}
                            >
                                Make User
                            </Button>
                        )
                    );
                },
                size: 100,
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: data?.users?.length > 0 ? data.users : [],
        enableColumnFilters: true,
        enableGlobalFilter: true,
        enableHiding: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,

        initialState: {
            density: 'compact',
        },

        muiTablePaperProps: {
            elevation: 3,
            sx: {
                backgroundColor: "#1e1e1e",
                borderRadius: 2,
                border: '1px solid #333',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: "#2b2b2b",
                color: "#FF9021",
                fontWeight: "bold",
                borderBottom: "1px solid #444",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                backgroundColor: "#1e1e1e",
                color: "#fff",
                borderBottom: "1px solid #333",
            },
        },
        muiTopToolbarProps: {
            sx: {
                backgroundColor: "#2b2b2b",
                color: "#fff",
                borderBottom: "1px solid #333",
                '& .MuiInputBase-root': {
                    backgroundColor: '#333',
                    color: '#fff',
                },
                '& .MuiSvgIcon-root': {
                    color: '#FF9021',
                },
            },
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: "#2b2b2b",
                color: "#fff",
                borderTop: "1px solid #333",
                '& .MuiSelect-select': {
                    color: "#fff",
                },
                '& .MuiSvgIcon-root': {
                    color: "#FF9021",
                },
                '& .MuiTypography-root': {
                    color: '#ccc',
                },
                '& .MuiTablePagination-actions button': {
                    color: '#fff',
                },
            },
        },
        muiSearchTextFieldProps: {
            variant: "outlined",
            sx: {
                backgroundColor: "#333",
                borderRadius: 1,
                '& .MuiInputBase-input': { color: "#fff" },
                '& .MuiInputLabel-root': { color: "#aaa" },
            },
        },
        muiTableFilterTextFieldProps: {
            sx: {
                backgroundColor: "#333",
                color: "#fff",
                '& .MuiInputBase-input': { color: "#fff" },
                '& .MuiInputLabel-root': { color: "#aaa" },
            },
        },
        muiPaginationProps: {
            sx: {
                color: "#fff",
                '& .MuiSelect-select': { color: "#fff" },
                '& .MuiSvgIcon-root': { color: "#FF9021" },
                '& .MuiTablePagination-actions button': { color: "#fff" },
            },
        },
        muiTableBodyRowProps: {
            sx: {
                '&:hover': {
                    backgroundColor: "#2c2c2c",
                },
            },
        },
        muiToolbarAlertBannerProps: {
            sx: {
                backgroundColor: "#333",
                color: "#fff",
            },
        },
        state: {
            isLoading,
        },
    });

    return (
        <>
            <Typography variant="h5" fontWeight="bold" sx={{ my: 2, color: "#FF9021" }}>
                Admin - User Management
            </Typography>
            <MaterialReactTable table={table} />
        </>
    );
};

export default AdminUserManagement;

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { useGetAllUsersQuery, useMakeUserAdminMutation } from '../appSlice';
import { Button, Chip } from '@mui/material';
import { notifyError, notifySuccess } from '../common/Notifications/constants';

const AdminUserManagement = () => {

    const { data, isLoading } = useGetAllUsersQuery();
    const [makeUserAdmin] = useMakeUserAdminMutation();

    const handleMakeUserAdmin = async (id, value) => {
        try {
            await makeUserAdmin({ id, value });
            if (value === true) {
                notifySuccess("User promoted to Admin")
            } else{
                notifySuccess("Admin assigned to User")
            }
        } catch {
            notifyError("Failed to make user Admin");
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
                    cell?.getValue() ? (
                        <Chip label="Admin" color="success" />
                    ) : (
                        <Chip label="User" color="default" />
                    ),
                size: 100
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                Cell: ({ row }) => {
                    const user = row?.original;
                    return (
                        !user?.isAdmin ? (
                            <Button size="small" variant="contained" onClick={() => handleMakeUserAdmin(user._id, true)} > Make Admin </Button>
                        ) : (<Button size="small" variant="contained" onClick={() => handleMakeUserAdmin(user._id, false)} > Make User </Button>)
                    );
                },
                size: 100
            }

        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: data?.users.length > 0 ? data?.users : "",
    });

    return (
        <>
            <h2 style={{ margin: "10px 0px" }}>Admin - User Management</h2>
            <MaterialReactTable
                table={table}
                state={{ isLoading }}
            />
        </>
    )
}

export default AdminUserManagement
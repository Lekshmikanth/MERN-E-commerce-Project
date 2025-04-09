import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { useGetAllUsersQuery, useMakeUserAdminMutation } from '../appSlice';
import { Button, Chip } from '@mui/material';
import { notifyError, notifySuccess } from '../common/Notifications/constants';

const AdminUserManagement = () => {

    const { data, isLoading } = useGetAllUsersQuery();
    const [makeUserAdmin] = useMakeUserAdminMutation();

    const handleMakeUserAdmin = async (id, value) => {
        console.log("value", value);
        try {
            await makeUserAdmin({ id, value });
            notifySuccess("User promoted to admin")
        } catch {
            notifyError("Failed to make user admin");
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
            <MaterialReactTable
                table={table}
                state={{ isLoading }}
            />
        </>
    )
}

export default AdminUserManagement
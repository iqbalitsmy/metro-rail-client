import { Avatar, Box, Button, Checkbox, CircularProgress, IconButton, Input, InputAdornment, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faEnvelope, faMagnifyingGlass, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'User Name',
    },
    {
        id: 'source',
        numeric: false,
        disablePadding: false,
        label: 'Source',
    },
    {
        id: 'destination',
        numeric: false,
        disablePadding: false,
        label: 'Destination',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'paymentStatus',
        numeric: true,
        disablePadding: false,
        label: 'Payment Status',
    },
];

// Table header

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <Input
                        id="input-with-icon-adornment"
                        placeholder='Search User...'
                        startAdornment={
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </InputAdornment>
                        }
                    />
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FontAwesomeIcon icon={faBarsStaggered} />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const TicketsList = () => {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('status');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [anchorEl, setAnchorEl] = useState(Array(tickets.length).fill(null));


    // Edit and delete option
    const [open, setOpen] = useState(null);

    // Station List data
    useEffect(() => {
        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const response = await axios.get('http://localhost:3001/api/v1/tickets', { withCredentials: true });
                // console.log(response.data);
                setTickets(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error.message || 'An error occurred');
                console.log("Error :", error)
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    const rows = [...tickets];

    // console.log(rows)

    const handleOpenMenu = (event, index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = event.currentTarget;
        setAnchorEl(newAnchorEl);
    };

    const handleCloseMenu = (index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    // Handle delete user
    const handleDelete = async (event, id) => {
        // setOpen(null);
        // console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3001/api/v1/delete-ticket/${id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', // Set the Content-Type header
                        },
                    });
                    const responseData = await response.json();
                    if (response.ok) {
                        console.log(responseData);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User delete successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.location.reload(true)
                    } else {
                        console.error("Failed to delete user:", responseData.error);
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Failed to delete user",
                            text: "Pleas try again",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Something is wrong",
                        text: "Pleas try again",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    const handleSendMail = async (event, id) => {
        console.log(id)

        try {
            const response = await fetch(`http://localhost:3001/api/v1/ticket-mail/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Send mail successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error("Failed to send mail:", responseData.error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to send mail",
                    text: "Pleas try again",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something is wrong",
                text: "Pleas try again",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    // console.log(visibleRows)

    // // Calculate empty rows using Math.ceil
    // const emptyRows = Math.max(0, Math.ceil((1 + page) * rowsPerPage - users.length));

    // const visibleRows = stableSort(users, getComparator(order, orderBy)).slice(
    //     page * rowsPerPage,
    //     page * rowsPerPage + rowsPerPage,
    // );
    if (loading) {
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>; // Display a loading indicator
    }

    return (
        <section className='mt-10'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-2xl font-bold'>Tickets</h2>
                <Button variant="contained" className='' sx={{ fontSize: "18px", bgcolor: '#000' }}>
                    <Link to={"add-tickets"}>
                        <FontAwesomeIcon className='mr-2' icon={faPlus} />
                        New Tickets
                    </Link>
                </Button>
            </div>

            <Box className="" sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            // sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                            onClick={() => console.log(row._id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row._id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {/* name column avatar and name */}
                                            <TableCell component="th" scope="row"
                                                id={labelId} padding="none">
                                                {row.userName}
                                            </TableCell>
                                            {/* <TableCell align="right">{row.role}</TableCell> */}
                                            <TableCell sx={{ fontSize: '18px' }}>{row.fromStation}</TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{row.toStation}</TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{row.price}</TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{dayjs(row.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{dayjs(row.time).format('h:mm A')}</TableCell>
                                            <TableCell sx={{ fontSize: '18px' }}>{row.payment}</TableCell>

                                            {/* Edit and delete options */}
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>
                                                <IconButton onClick={(event) => handleOpenMenu(event, index)}>
                                                    ...
                                                </IconButton>
                                            </TableCell>
                                            <Popover
                                                // open={!!open}
                                                // anchorEl={open}
                                                // onClose={handleCloseMenu}
                                                open={!!anchorEl[index]}
                                                anchorEl={anchorEl[index]}
                                                onClose={() => handleCloseMenu(index)}
                                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                PaperProps={{
                                                    sx: { width: 140, boxShadow: '0 2px 10px rgba(5, 5, 5, 0.1)' },
                                                }}
                                            >
                                                <MenuItem onClick={handleCloseMenu}>
                                                    <Link to={`${row._id}`}>
                                                        <FontAwesomeIcon className='mr-2' icon={faPenToSquare} />
                                                        Edit
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={(event) => handleDelete(event, row._id)} sx={{ color: 'error.main', }}>
                                                    <FontAwesomeIcon className='mr-2' icon={faTrashCan} />
                                                    Delete
                                                </MenuItem>
                                                <MenuItem onClick={(event) => handleSendMail(event, row._id)}>
                                                    <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                                                    Send Tickets
                                                </MenuItem>
                                            </Popover>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15, 20, 25, 30]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

        </section>
    );
};

export default TicketsList;
import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, IconButton, Input, InputAdornment, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faMagnifyingGlass, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';



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
        label: 'Station Name',
    },
    {
        id: 'stationSerial',
        numeric: true,
        disablePadding: false,
        label: 'Station Serial',
    },
    {
        id: 'time',
        numeric: false,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
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
                            'aria-label': 'select all Train',
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
                        placeholder='Search Train...'
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




const StationList = () => {
    const [station, setStation] = useState([]);
    let rows;

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    // Edit and delete option
    const [open, setOpen] = React.useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Station List data
    useEffect(() => {
        const fetchData = async () => {
            // Make a GET request with cookies using fetch
            try {
                const response = await axios.get('http://localhost:3001/api/v1/stations', { withCredentials: true });
                // console.log(response.data);
                setStation(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error.message || 'An error occurred');
                console.log("Error :", error)
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    function createData(id, name, location, stationSerial, status) {
        return {
            id,
            name,
            location,
            stationSerial,
            status,
        };
    }
    rows = [...station.map(s => createData(s._id, s.name, s.location, s.stationSerial, s.status))]

    console.log(rows)

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
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

    // // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // const visibleRows = React.useMemo(
    //     () =>
    //         stableSort(rows, getComparator(order, orderBy)).slice(
    //             page * rowsPerPage,
    //             page * rowsPerPage + rowsPerPage,
    //         ),
    //     [order, orderBy, page, rowsPerPage],
    // );

    // Calculate empty rows using Math.ceil
    const emptyRows = Math.max(0, Math.ceil((1 + page) * rowsPerPage - station.length));

    const visibleRows = stableSort(station, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );
    if (loading) {
        return <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>; // Display a loading indicator
    }

    return (
        <section className='mt-10'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-2xl font-bold'>Train List</h2>
                <Button variant="contained" className='' sx={{ fontSize: "18px", bgcolor: '#000' }}>
                    <Link to={"add-station"}>
                        <FontAwesomeIcon className='mr-2' icon={faPlus} />
                        New Station
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
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <Fragment key={row.name}>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                // aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                            // selected={isItemSelected}
                                            // sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        aria-checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row"
                                                    id={labelId} padding="none">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>{row.stationSerial}</TableCell>
                                                <TableCell>08:00 AM to 08:00 PM</TableCell>
                                                <TableCell>{row.location}</TableCell>
                                                <TableCell>{row.status}</TableCell>

                                                {/* Edit and delete options */}
                                                <TableCell align="right">
                                                    <IconButton onClick={handleOpenMenu}>
                                                        ...
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <Popover
                                                open={!!open}
                                                anchorEl={open}
                                                onClose={handleCloseMenu}
                                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                PaperProps={{
                                                    sx: { width: 140, boxShadow: '0 2px 10px rgba(5, 5, 5, 0.1)' },
                                                }}
                                            >
                                                <MenuItem onClick={handleCloseMenu}>
                                                    <FontAwesomeIcon className='mr-2' icon={faPenToSquare} />
                                                    Edit
                                                </MenuItem>

                                                <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main', }}>
                                                    <FontAwesomeIcon className='mr-2' icon={faTrashCan} />
                                                    Delete
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main', }}>
                                                    Deactivate
                                                </MenuItem>
                                            </Popover>
                                        </Fragment>
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

export default StationList;
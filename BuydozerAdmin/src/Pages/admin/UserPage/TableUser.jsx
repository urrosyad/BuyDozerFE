import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { GET_USER } from '@api/api';
import { useNavigate } from 'react-router-dom';
import { EditButton, DeleteButton, KeyButton } from '@components/admin/Atoms/Buttons';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { SwapVertRounded, KeyboardArrowDown, KeyboardArrowUp, KeyRounded, KeyOffRounded } from '@mui/icons-material';
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton, Collapse,
  CircularProgress,
} from '@mui/material'


const TableUser = (props) => {
  const { SearchValue } = props
  const navigate = useNavigate()
  const [page, setPage] = useState(1); // Halaman ke
  const [totalData, setTotalData] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 
  const [sortUserName, setSortUserName] = useState(false)

  const fetchData = async () => {
    const { dataUser, totalCount } = await GET_USER({ Username: SearchValue, PageNumber: page, PageSize: rowsPerPage, SortUserName: sortUserName });
    setTotalData(totalCount);
    if (!dataUser) {
      throw new Error("Failed to fetch data");
    };
    const formattedData = dataUser.map(data => ({
      id: data.id,
      userName: data.userName,
      email: data.email,
      companyUser: data.companyUser,
      positionUser: data.positionUser,
      isAdmin: data.isAdmin,
    }));
    return formattedData;
  };

  const {
    data, isPending, isFetching, isLoading, error, refetch } = useQuery({
      queryKey: ["User"],
      queryFn: fetchData,
    })
    {error && navigate("/*")}

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleSortUserName = () => {
    setSortUserName(!sortUserName)
  }

  const handleEditOnClick = (index) => {
    const clickedData = data[index].userName;

    // to send data nameUnit to parent Component
    props.onSelectRow(clickedData);
  }

  const handleDelOnClick = (index) => {
    const idRow = data[index].id;
    const userNameRow = data[index].userName;

    // to send data nameUnit to parent Component
    props.onSelectRowId(idRow, userNameRow);
  }

  const handleKeyOnClick = (index) => {
    const idRow = data[index].id;
    const roleRow = data[index].isAdmin;
    const userNameRow = data[index].userName;

    props.onSelectRowRole(idRow, roleRow, userNameRow);
  }

  useEffect(() => {
    refetch()
  }, [SearchValue, page, rowsPerPage, sortUserName, refetch]);
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <p>{props.row.index + 1}</p> },
    { accessorKey: "userName", header: "Nama Pengguna", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "email", header: "Email", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "companyUser", header: "Perusahaan Pengguna", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "positionUser", header: "Jabatan Pengguna", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "isAdmin", header: "Role", width: "10%", cell: (props) => <p>{props.getValue() ? "Administrator" : "Customer"}</p> },
    {
      accessorKey: "actions", header: "Aksi", width: "5%", cell: (props) => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-around', flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
            <Box>
              <KeyButton isAdmin={props.row.original.isAdmin} onClick={() => handleKeyOnClick(props.row.index)} />
              <EditButton onClick={() => handleEditOnClick(props.row.index)} />
            </Box>
          </Box>
          <Box>
            <DeleteButton onClick={() => handleDelOnClick(props.row.index)} />
          </Box>
        </Box>
      )
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })


  if (data === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
        <CircularProgress size={50} sx={{
          color: "#8BB9FF",
          mb: 20
        }}
        />
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "15px", width: "100%", }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead style={{ height: "1px" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} align='center' sx={{ bgcolor: "#8BB9FF", width: header.column.columnDef.width }}>
                    <Typography sx={{ fontSize: "14px", color: "#EEF2FF", fontWeight: "medium" }}>
                      {header.column.columnDef.header}
                      {(header.column.columnDef.accessorKey === "userName") ? (
                        <IconButton sx={{ fontSize: 'small', color: "#F8FAFF" }} onClick={handleSortUserName}>
                          <SwapVertRounded />
                        </IconButton>
                      ) : null}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody key={columns}>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align='center' sx={{ color: "#2A6DD0" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium" }}>
                  {isPending || isFetching ? (
                    <CircularProgress sx={{ color: "#2A6DD0" }} />
                  ) : (
                    "User tidak ditemukan"
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row, index) => {
              const rowStyle = { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFF' };
              return (
                <>
                  <TableRow key={row.id} style={rowStyle}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} align='center' sx={{ color: "#2A6DD0", borderBottom: "none", fontWeight: "medium", overflow: "wrap" }}>
                          <Typography sx={{ fontSize: "14px", }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Typography>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </>
              )
            }))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalData}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TableUser

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, status1, status) {
  return {
    name,
    calories,
    fat,
    carbs,
    status1,
    status,
    history: [
      {
        date: '2020-01-05',
        customerId: 'Apple',
        amount: 3,
        status:"processing.."
      },
      {
        date: '2020-01-02',
        customerId: 'Coffe',
        amount: 1,
        status:"processing.."
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: 'white' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{color:'white'}}>
          {row.name}
        </TableCell>
        <TableCell sx={{color:'white'}} align="right">{row.calories}</TableCell>
        <TableCell sx={{color:'white'}} align="right">{row.fat}</TableCell>
        <TableCell sx={{color:'white'}} align="right">{row.carbs}</TableCell>
        <TableCell
                  sx={{
                    color: row.status1 === 'done' ? 'green' :
                          row.status1 === 'processing' ? 'orange' :
                          row.status1 === 'out of stock' ? 'red' :
                          'white'
                  }}
                  align="right"
                >
                  {row.status1}
                </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} sx={{color:'white'}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Oreder Details
              </Typography>
              <Table size="small" aria-label="purchases">

                <TableHead>
                  <TableRow>
                    <TableCell sx={{color:'white'}} >Date</TableCell>
                    <TableCell sx={{color:'white'}}>item</TableCell>
                    <TableCell sx={{color:'white'}} align="right">Quantity</TableCell>
                    <TableCell sx={{color:'white'}} align="right">Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell sx={{color:'white'}} component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell sx={{color:'white'}}>{historyRow.customerId}</TableCell>
                      <TableCell sx={{color:'white'}} align="right">{historyRow.amount}</TableCell>
                      <TableCell sx={{color:'white'}} align="right">{historyRow.status}</TableCell>
                    </TableRow>
                  ))} 
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    status1: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('#125642', 159, 6.0, 24, 'Processing..', 'processing..'),
  createData('#1852642', 237, 9.0, 37, 'Done', 'processing..'),
  createData('#135142', 262, 16.0, 24, 'Out of stock', 'processing..'),
  createData('#1854242', 305, 3.7, 67, 'Processing..', 'processing..'),
  createData('#136742', 356, 16.0, 49, 'Processing..', 'processing..'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer>
      <Table aria-label="collapsible table" className='orders-table'>

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{color:'white'}}>Order Number</TableCell>
            <TableCell sx={{color:'white'}} align="right">Calories</TableCell>
            <TableCell sx={{color:'white'}} align="right">Fat&nbsp;(g)</TableCell>
            <TableCell sx={{color:'white'}} align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell sx={{color:'white'}} align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
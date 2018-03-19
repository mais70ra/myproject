import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';
import { Translate } from '../../Setup/Translate';

const styles = {};

class TableFooterWrapper extends Component {
  render() {
    const { columns, paging, onPageChange, onPageSizeChange } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={columns.length}
            count={paging.totalRecords || 0}
            rowsPerPage={paging.pageSize}
            page={paging.pageNumber - 1}
            backIconButtonProps={{
              'aria-label': Translate('Previous Page')
            }}
            nextIconButtonProps={{
              'aria-label': Translate('Next Page')
            }}
            labelRowsPerPage={Translate('Rows per page:')}
            onChangePage={(e, pageNumber) => onPageChange(pageNumber + 1)}
            onChangeRowsPerPage={e => onPageSizeChange(e.target.value)}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(styles)(TableFooterWrapper);

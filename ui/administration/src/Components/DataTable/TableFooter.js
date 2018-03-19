import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  TableFooter,
  TablePagination,
  TableRow
} from 'material-ui/Table';
import { translate } from 'react-i18next';

const styles = {};

class TableFooterWrapper extends Component {
  render() {
    const { columns, paging, onPageChange, onPageSizeChange, t } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={columns.length}
            count={paging.totalRecords || 0}
            rowsPerPage={paging.pageSize}
            page={paging.pageNumber - 1}
            backIconButtonProps={{
              'aria-label': t('Previous Page')
            }}
            nextIconButtonProps={{
              'aria-label': t('Next Page')
            }}
            labelRowsPerPage={t('Rows per page:')}
            onChangePage={(e, pageNumber) => onPageChange(pageNumber + 1)}
            onChangeRowsPerPage={e => onPageSizeChange(e.target.value)}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default translate()(withStyles(styles)(TableFooterWrapper));

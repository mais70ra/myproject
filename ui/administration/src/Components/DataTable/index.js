import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Table from 'material-ui/Table';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableFooter from './TableFooter';

class DataTable extends Component {
  render() {
    const {
      onRowClick,
      customHeader,
      columns,
      showCheckboxes,
      enableSelectAll,
      onColumnClick,
      onHeaderClick,
      data,
      emptyMessage,
      selected,
      onSelect,
      paging,
      onPageChange,
      onPageSizeChange,
      idProp,
      ...rest
    } = this.props;

    return (
      <Paper elevation={0}>
        <div style={{ overflowX: 'auto' }}>
          <Table {...rest}>
            {customHeader ? (
              customHeader
            ) : (
              <TableHead
                showCheckboxes={showCheckboxes}
                columns={columns}
                onHeaderClick={onHeaderClick}
                selected={selected}
                onSelect={onSelect}
                data={data}
                enableSelectAll={enableSelectAll}
              />
            )}
            <TableBody
              idProp={idProp}
              data={data}
              columns={columns}
              showCheckboxes={showCheckboxes}
              onRowClick={onRowClick}
              onSelect={onSelect}
              onColumnClick={onColumnClick}
              selected={selected}
              emptyMessage={emptyMessage}
            />
            {!!paging &&
              !!data.length && (
                <TableFooter
                  columns={columns}
                  paging={paging}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
          </Table>
        </div>
      </Paper>
    );
  }
}

export default DataTable;

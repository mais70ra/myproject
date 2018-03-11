import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class DataTable extends Component {
  render() {
    const {
      height,
      fixedFooter,
      fixedHeader,
      selectable,
      multiSelectable,
      style,
      bodyStyle,
      wrapperStyle,
      onRowSelection,
      onRowClick,
      customTableProps,
      customHeader,
      columns,
      enableSelectAll,
      showCheckboxes,
      superHeader,
      deselectOnClickaway,
      showRowHover,
      stripedRows,
      onColumnClick,
      onHeaderClick,
      data,
      emptyMessage,
      customFooter,
      selected
    } = this.props;

    const header = customHeader
      ? customHeader
      : columns &&
        columns.length && (
          <TableHeader
            displaySelectAll={showCheckboxes && enableSelectAll}
            adjustForCheckbox={showCheckboxes}
            enableSelectAll={showCheckboxes && enableSelectAll}
          >
            {superHeader && (
              <TableRow>
                <TableHeaderColumn
                  colSpan={columns.length}
                  style={
                    typeof superHeader === 'function'
                      ? { textAlign: 'center' }
                      : undefined
                  }
                >
                  {typeof superHeader === 'function' ? (
                    superHeader()
                  ) : (
                    <h3>{superHeader}</h3>
                  )}
                </TableHeaderColumn>
              </TableRow>
            )}
            <TableRow>
              {columns.map(
                (column, index) =>
                  column.customHeaderRender ? (
                    column.customHeaderRender(column, index)
                  ) : (
                    <TableHeaderColumn
                      width={column.width}
                      style={column.style}
                      key={index}
                      className={column.className}
                      tooltip={column.tooltip || undefined}
                      onTouchTap={() =>
                        onHeaderClick && onHeaderClick(column, index)
                      }
                    >
                      {column.header}
                    </TableHeaderColumn>
                  )
              )}
            </TableRow>
          </TableHeader>
        );

    const body = (
      <TableBody
        displayRowCheckbox={showCheckboxes}
        deselectOnClickaway={deselectOnClickaway === true}
        showRowHover={showRowHover !== false}
        stripedRows={stripedRows}
      >
        {data.map((row, index) => (
          <TableRow
            key={index}
            style={{ cursor: 'pointer' }}
            onTouchTap={() => onRowClick && onRowClick(row, index)}
            selected={
              onRowSelection ? selected.some(idx => idx === index) : undefined
            }
          >
            {columns.map((column, index) => (
              <TableRowColumn
                width={column.width}
                style={column.style}
                className={column.className}
                key={index}
                onTouchTap={() => onColumnClick && onColumnClick(column, row)}
              >
                {column.render
                  ? column.render(column, row, index)
                  : row[column.key]}
              </TableRowColumn>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );

    const footer = customFooter
      ? customFooter()
      : !data.length &&
        emptyMessage && (
          <TableFooter adjustForCheckbox={showCheckboxes}>
            <TableRow>
              <TableRowColumn
                style={{ textAlign: 'center', verticalAlign: 'middle' }}
                colSpan={columns.length}
              >
                {emptyMessage}
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        );

    return (
      <Table
        height={height || 'auto'}
        fixedHeader={fixedHeader || false}
        fixedFooter={fixedFooter || false}
        selectable={selectable || multiSelectable || false}
        multiSelectable={multiSelectable}
        style={{ tableLayout: 'auto', ...style }}
        bodyStyle={{ overflowX: 'auto', ...bodyStyle }}
        wrapperStyle={wrapperStyle}
        onRowSelection={onRowSelection}
        {...customTableProps}
      >
        {header}
        {body}
        {footer}
      </Table>
    );
  }
}

DataTable.defaultProps = {
  showCheckboxes: true,
  enableSelectAll: false,
  multiSelectable: false,
  selectable: true,
  selected: [],
  data: [],
  columns: []
};

export default DataTable;

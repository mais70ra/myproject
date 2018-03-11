import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const styles = {};

class TableHeadWrapper extends Component {
  handleSelectAll = (e, checked) => {
    const { selected, data, onSelect } = this.props;
    if (!onSelect || !Array.isArray(selected)) {
      return;
    }

    if (checked) {
      onSelect([...data]);
    } else {
      onSelect([]);
    }
  };

  createSortHandler = property => event => {
    const { onSort } = this.props;
    if (!onSort) {
      return;
    }
    onSort(event, property);
  };

  render() {
    const {
      classes,
      customClasses,
      columns,
      onSelectAllClick,
      onHeaderClick,
      order,
      orderBy,
      showCheckboxes,
      data,
      selected = [],
      onSelect,
      enableSelectAll,
      ...rest
    } = this.props;

    return (
      <TableHead {...rest}>
        <TableRow>
          {showCheckboxes && (
            <TableCell padding="checkbox">
              {enableSelectAll && (
                <Checkbox
                  indeterminate={
                    !!(selected.length && selected.length < data.length)
                  }
                  checked={
                    !!(selected.length && selected.length >= data.length)
                  }
                  onChange={this.handleSelectAll}
                />
              )}
            </TableCell>
          )}
          {columns.map((column, index) => {
            const {
              customHeaderRender,
              sortable,
              header,
              key,
              render,
              ...rest
            } = column;

            return customHeaderRender ? (
              customHeaderRender(column, index)
            ) : (
              <TableCell
                key={index}
                onTouchTap={() => onHeaderClick && onHeaderClick(column, index)}
                {...rest}
              >
                {sortable ? (
                  <TableSortLabel
                    active={orderBy === key}
                    direction={order}
                    onClick={this.createSortHandler(key)}
                  >
                    {header}
                  </TableSortLabel>
                ) : (
                  header
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(TableHeadWrapper);

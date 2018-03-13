import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableBody, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const styles = {};

class TableBodyWrapper extends Component {
  handleSelect = row => {
    const { selected, idProp, onSelect } = this.props;
    if (!onSelect || !Array.isArray(selected)) {
      return;
    }

    const index = selected.findIndex(x => x[idProp] === row[idProp]);
    if (index > -1) {
      const nextSelected = [...selected];
      nextSelected.splice(index, 1);
      onSelect(nextSelected);
    } else {
      onSelect(selected.concat([row]));
    }
  };

  isSelected = row => {
    const { selected = [], idProp } = this.props;
    return selected.some(x => x[idProp] === row[idProp]);
  };

  render() {
    const {
      data,
      columns,
      showCheckboxes,
      idProp,
      onColumnClick,
      onRowClick,
      onSelect,
      emptyMessage,
      selected,
      ...rest
    } = this.props;
    console.log(data);
    return (
      <TableBody {...rest}>
        {!data.length && (
          <TableRow>
            <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
        {data.map((row, idx) => {
          const isSelected = this.isSelected(row);

          return (
            <TableRow
              hover
              tabIndex={-1}
              key={idx}
              onClick={e => {
                onRowClick && onRowClick(row, idx);
                this.handleSelect(row);
              }}
              selected={isSelected}
            >
              {showCheckboxes && (
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>
              )}
              {columns.map((column, idx) => {
                const { key, render, ...rest } = column;

                return render ? (
                  <TableCell key={idx} {...rest}>
                    {render(column, idx, row)}
                  </TableCell>
                ) : (
                  <TableCell
                    key={idx}
                    onTouchTap={() =>
                      onColumnClick && onColumnClick(column, idx, row)
                    }
                    {...rest}
                  >
                    {row[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  }
}

export default withStyles(styles)(TableBodyWrapper);

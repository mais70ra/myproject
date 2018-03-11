const style = ({ palette }) => ({
  inputRoot: {
    border: 'none'
  },
  inputUnderline: {
    display: 'hidden'
  },
  inputInput: {
    borderRadius: 0,
    border: `1px solid ${palette.grey[300]}`,
    height: '28px',
    lineHeight: '28px',
    padding: '0 5px',
    cursor: 'pointer',
    '&:focus': {
      border: `1px solid ${palette.primary.light} !important`
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'default'
    }
  },
  formControlRoot: {
    width: '100%'
  },
  labelRoot: {},
  labelShrink: {},
  floatingLabelRoot: {
    padding: '0 15px',
    backgroundColor: palette.common.white
  },
  floatingLabelShrink: {
    left: '10px',
    top: '8px',
    zIndex: '1',
    padding: '0 8px'
  },
  endAdornmentIconButtonRoot: {
    height: '100%',
    color: palette.primary.contrastText,
    width: 30
  },
  endAdornmentRoot: {
    background: palette.primary.main,
    position: 'absolute',
    marginLeft: 0,
    bottom: 0,
    right: 0,
    height: '100% !important',
    width: 30
  }
});

export default style;

const input = ({ palette }) => ({
  root: {
    border: 'none'
  },
  underline: {
    display: 'hidden'
  },
  input: {
    borderRadius: 0,
    border: `1px solid ${palette.grey[300]}`,
    height: '28px',
    lineHeight: '28px',
    padding: '0 5px',
    '&:focus': {
      border: `1px solid ${palette.primary.light} !important`
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'default'
    }
  }
});

const floatingLabel = ({ palette }) => ({
  root: {
    padding: '0 15px',
    backgroundColor: palette.common.white
  },
  shrink: {
    left: '10px',
    top: '8px',
    zIndex: '1',
    padding: '0 8px'
  }
});

const label = {};

const helperText = {};

const formControl = { root: { width: '100%' } };

export default { formControl, input, label, floatingLabel, helperText };

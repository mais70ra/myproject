const select = ({ disabled }) => ({ palette }) => ({
  icon: {
    background: disabled ? palette.action.disabled : palette.primary.main,
    color: palette.primary.contrastText,
    height: '100%',
    width: '30px',
    top: '0'
  },
  select: {
    '&:focus': {
      background: palette.common.white
    },
    '&:disabled': {
      opacity: 0.5
    }
  }
});

const formControl = {
  root: {
    width: '100%'
  }
};

export default { select, formControl };

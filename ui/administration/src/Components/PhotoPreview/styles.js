const title = ({ palette }) => ({
  root: {
    background: palette.grey[100],
    borderBottom: `2px solid ${palette.grey[200]}`,
    color: palette.primary.contrastText,
    fontSize: '18px',
    fontWeight: '700',
    textAlign: 'center'
  }
});

const content = {
  root: {
    paddingTop: '24px'
  }
};

const actions = ({ palette }) => ({
  root: {
    background: palette.grey[100],
    borderTop: `2px solid ${palette.grey[200]}`,
    margin: '0',
    padding: '10px 0'
  }
});

export default { title, content, actions };

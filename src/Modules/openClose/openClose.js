const openClose = e => {
  e.state.open ? e.setState({ open: false }) : e.setState({ open: true });
};

export default openClose;

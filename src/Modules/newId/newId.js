const newId = e => {
  const uuidv1 = require("uuid/v1");
  const numbers = uuidv1();
  e.setState({
    newId: numbers
  });
};

export default newId;

/*newId = () => {
    const uuidv1 = require("uuid/v1");
    const numbers = uuidv1();
    this.setState({
      newId: numbers
    });
  };*/

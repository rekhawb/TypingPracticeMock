export const saveParaInput = (paraInput) => {
        localStorage.setItem('paraInput', JSON.stringify(paraInput));
  };
  


  export const saveParaUser = (paraUser) => {
    localStorage.setItem('paraUser', JSON.stringify(paraUser));
};



export const getParaInput = () => {
    const paraInput = localStorage.getItem('paraInput')
    ? JSON.parse(localStorage.getItem('paraInput'))
    : '';

  return paraInput;
};



export const getParaUser = () => {
    const paraUser = localStorage.getItem('paraUser')
    ? JSON.parse(localStorage.getItem('paraUser'))
    : '';

  return paraUser;
};


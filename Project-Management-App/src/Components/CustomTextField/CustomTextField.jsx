import "./CustomTextField.css";

const CustomTextField = ({ type, placeholder, onTextChange }) => {
  const handleChange = (event) => {
    onTextChange(event.target.value);
  };
  return (
    <input
      className="customTextInput"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default CustomTextField;

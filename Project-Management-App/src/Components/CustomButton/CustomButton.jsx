import "./CustomButton.css";

const CustomButton = ({ text, onClick }) => {
  return (
    <button className="customButton" onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default CustomButton;

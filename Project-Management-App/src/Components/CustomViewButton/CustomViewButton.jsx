import "./CustomViewButton.css";

const CustomViewButton = ({text, onClick}) => {
  return (
    <button className="customViewButton" onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default CustomViewButton;

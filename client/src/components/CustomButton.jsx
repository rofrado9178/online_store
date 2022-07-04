import { Button } from "react-bootstrap";
const CustomButton = ({ children }) => {
  return (
    <section>
      <style type="text/css">
        {`
                        .btn-custom {
                        background-color: #ffa41c;
                        color: white;
                        width: 100%;
                        margin-top:10px;
                        }
                        .btn-custom:hover{
                          background-color:white;
                          color:black;
                          border: 1px solid black;
                        }
                        `}
      </style>

      <Button
        type="submit"
        className="rounded-pill btn-sm"
        variant="custom"
        onClick={(submit) => submit}
      >
        {children}
      </Button>
    </section>
  );
};

export default CustomButton;

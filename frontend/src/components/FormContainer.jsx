import { Container } from "react-bootstrap";


const FormContainer = ({children}) => {
    return (
        <div>
            <Container>
                {children}
            </Container>
        </div>
    );
};
 
export default FormContainer;
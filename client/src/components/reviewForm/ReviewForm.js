import { Form, Button } from "react-bootstrap";

const ReviewForm = ({ handleSubmit, revText, onInputChange, labelText }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group
                className="mb-3"
                controlId="reviewText"
            >
                <Form.Label>{labelText}</Form.Label>
                <Form.Control
                    value={revText}
                    as="textarea"
                    rows={3}
                    // defaultValue={defaultValue}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Button variant="outline-info" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;

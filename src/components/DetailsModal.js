import { Button, Modal, Form } from 'react-bootstrap';

function DetailsModal({modalOpen, country, onClose, onNext, onPrev, hasNext, hasPrev, notes, setNotes}) {

	return (
		<Modal show={modalOpen} onHide={onClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>{country.name}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<p>
	        		Capital City: {country.capitalCity}
	        	</p>
	        	<Form>
				  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				    <Form.Label>Notes:</Form.Label>
				    <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}/>
				  </Form.Group>
				</Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="primary" disabled={!hasPrev} onClick={onPrev}>
	            Previous
	          </Button>
	          <Button variant="primary" disabled={!hasNext} onClick={onNext}>
	            Next
	          </Button>
	        </Modal.Footer>
        </Modal>
	);
}

export default DetailsModal;
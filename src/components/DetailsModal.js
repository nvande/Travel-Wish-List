import { Button, Modal, Form } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function DetailsModal({modalOpen, index, total, country, onClose, onNext, onPrev, hasNext, hasPrev, notes, setNotes}) {

	return (
		<Modal show={modalOpen} onHide={onClose}>
	        <Modal.Header closeButton className={"text-white color-"+index}>
	          <Modal.Title>{country.name}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<p className={"h5 mb-4"}>
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
	        	<div className={"w-100 text-center d-table"}>
		          <Button className="float-start pb-3" variant="primary" size="lg" disabled={!hasPrev} onClick={onPrev}>
		            <FaChevronLeft/>
		          </Button>
		          	<span className="lead h-100 d-table-cell align-middle">{index + 1} / {total}</span>
		          <Button className="float-end pb-3" variant="primary" size="lg" disabled={!hasNext} onClick={onNext}>
		          	<FaChevronRight/>
		          </Button>
		          </div>
	        </Modal.Footer>
        </Modal>
	);
}

export default DetailsModal;
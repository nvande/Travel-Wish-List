import { Button, Modal, Form } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

function DetailsModal({modalOpen, index, total, country, onClose, onNext, onPrev, hasNext, hasPrev, notes, setNotes}) {

	return (
		<Modal show={modalOpen} onHide={onClose}>
	        <Modal.Header closeButton className={"text-white border-0 color-"+(index%10)}>
	          <Modal.Title>{country.name}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<p className={"h5 mb-4"}>
	        		<FaStar className={"iconInline"}/> Capital: <span className={"lead"}>{country.capitalCity}</span>
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
		          <Button className="float-start backButton" variant="primary" size="lg" disabled={!hasPrev} onClick={onPrev}>
		            <FaChevronLeft className={"iconInline"}/> <span>Back</span>
		          </Button>
		          	<span className="lead h-100 d-table-cell align-middle user-select-none">{index + 1} / {total}</span>
		          <Button className="float-end nextButton" variant="primary" size="lg" disabled={!hasNext} onClick={onNext}>
		          	<span>Next</span> <FaChevronRight className={"iconInline"}/>
		          </Button>
		          </div>
	        </Modal.Footer>
        </Modal>
	);
}

export default DetailsModal;
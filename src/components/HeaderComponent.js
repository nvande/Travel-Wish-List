import { FaGlobe } from 'react-icons/fa';
import { Button, Container, Row, Col } from 'react-bootstrap';

function HeaderComponent(props){

	return (
		<Container className={'mt-3 mt-sm-5 px-md-3 px-lg-5 pt-3 pb-2 pb-md-2 text-muted text-center text-md-start pageHeader bg-success text-white clearfix'}>
			<Row>
				<Col sm="12" md="6">
					<h2 className='text-white mt-3 mt-md-0 text-center text-md-start pageTitle'><FaGlobe className={'iconInline'}/> Travel Wish List </h2>
				</Col>
			</Row>
		</Container>
	);
}

export default HeaderComponent;
import { Container } from 'react-bootstrap';
import { FaPlane } from 'react-icons/fa';

function LoadingComponent(props){
	return (
		<Container className={'text-center mt-5 mb-5 loadingComponent'}>
			<FaPlane className={"loadingIcon"}/>
		</Container>
	);
}

export default LoadingComponent;
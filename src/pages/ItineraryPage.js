import PageComponent from '../components/PageComponent.js';
import ItineraryComponent from '../components/ItineraryComponent.js';

function ItineraryPage() {
	return (
		<PageComponent>
			<p>
				Click to generate an itinerary!
			</p>
			<ItineraryComponent/>
		</PageComponent>
	);
}

export default ItineraryPage;
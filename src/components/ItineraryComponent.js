import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import config from "../config.json";

import CountryComponent from './CountryComponent';
import LoadingComponent from './LoadingComponent';
import DetailsModal from './DetailsModal';

function ItineraryComponent() {
	const [countries, setCountries] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [selectedNotes, setSelectedNotes] = useState([]);
	const [regenerate, setRegenerate] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalIndex, setModalIndex] = useState(0);
	const [shouldShowHelp, setShouldShowHelp] = useState(true);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if(regenerate && countries.length > 0) {
			pickCountries();
			setRegenerate(false);
		}
	}, [regenerate, countries])

	const pickCountries = () => {
		const length = countries.length;
		let indexes = [];
		let selected = [];
		while( indexes.length < config.numberOfCountries ) {
			const index = getRandomInt(length);
			if( indexes.indexOf(index) === -1 && countries[index]['capitalCity'] != "" ){
				indexes.push(index);
				selected.push(countries[index]);
			}
		}
		setSelectedCountries(selected);
		setSelectedNotes(Array(selected.length).fill(""));
	}

	const removeCountry = (country) => {
		const index = selectedCountries.indexOf(country);
		if(index > -1) {
			let newSelected = [...selectedCountries];
			let newNotes = [...selectedNotes];
			newSelected.splice(index, 1);
			newNotes.splice(index, 1);
			setSelectedCountries(newSelected);
			setSelectedNotes(newNotes);
		}
	}

	const getRandomInt = (max) => {
	  return Math.floor(Math.random() * max);
	}

	const getCountries = async() => {
		setLoading(true);
		let buffer = [];
		let pages = 0;
		let data = await fetchPage(1);
		buffer = data[1];
		pages = data[0].pages;

		for( let i = 2; i <= pages; i++) {
			let data = await fetchPage(i);
			buffer = buffer.concat(data[1]);
		}
		setCountries(buffer);
		setLoading(false);
	};

	const onClickButton = async() => {
		if(countries.length == 0) {
			getCountries();
		}
		setRegenerate(true);
	}

	const openModal = (index) => {
		setModalOpen(true);
		setModalIndex(index);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	const hasNext = (index) => {
		return index + 1 < selectedCountries.length;
	}

	const hasPrev = (index) => {
		return index > 0;
	}

	const onNext = (index) => {
		if(hasNext(index)) {
			setModalIndex(index + 1);
		}
	}

	const onPrev = (index) => {
		if(hasPrev(index)) {
			setModalIndex(index - 1);
		}
	}

	const setNotes = (index, text) => {
		let notes = [...selectedNotes];
		notes[index] = text;
		setSelectedNotes(notes);
	}

	const fetchPage = async(page) => {
		const data = await fetch(config.apiUrl+"&page="+page).then(res => res.json());

		return data;
	};

	const reorder = (list, startIndex, endIndex) => {
	  const result = Array.from(list);
	  const [removed] = result.splice(startIndex, 1);
	  result.splice(endIndex, 0, removed);

	  return result;
	};

	const onDragEnd = (result) => {
	    // dropped outside the list
	    if (!result.destination) {
	      return;
	    }

	    const items = reorder(
	      selectedCountries,
	      result.source.index,
	      result.destination.index
	    );

	    const notes = reorder(
	    	selectedNotes,
	    	result.source.index,
	    	result.destination.index
	    );

	    setSelectedCountries(items);
	    setSelectedNotes(notes);
	  }

	if(loading) {
		return (
			<LoadingComponent/>
		);
	}

	return (
		<div>
			{selectedCountries.length > 0 ?
		      <DragDropContext onDragEnd={onDragEnd}>
		        <Droppable droppableId="droppable">
		          {(provided, snapshot) => (
		            <div
		              ref={provided.innerRef}
		              {...provided.droppableProps}
		            >
		              {selectedCountries.map((country, index) => (
		                <Draggable key={country.id} draggableId={country.id} index={index}>
		                  {(provided, snapshot) => (
		                    <div
		                      ref={provided.innerRef}
		                      {...provided.draggableProps}
		                      {...provided.dragHandleProps}
		                    >
		                      <CountryComponent
		                      	index={index}
		                      	country={country}
		                      	openDetails={() => openModal(index)}
		                      	removeCountry={() => removeCountry(country)}
		                      	shouldShowHelp={shouldShowHelp}
		                      	setShouldShowHelp={() => setShouldShowHelp()}
		                      />
		                    </div>
		                  )}
		                </Draggable>
		              ))}
		              {provided.placeholder}
		            </div>
		          )}
		        </Droppable>
		      </DragDropContext>
		      :
		      <div>
		      	<img className={"img-responsive"} src="traveler.jpg"/>
		      	<p className={"text-center mt-3 lead"}>
		        	Ready to travel the world?
		     	</p>
				<p className={"text-center mt-3 mb-4"}>
		        	Click 'Generate List' to generate a randomized itinerary to get started.
		     	</p>
		      </div>
	  		}
  		  <div className="text-center mt-3">
			<Button variant="success" size="lg" onClick={onClickButton}>
				{selectedCountries.length == 0 ? 'Generate List' : ' Regenerate List'}
			</Button>
			{ selectedCountries.length != 0 &&
				<Button variant="outline-success" size="lg" className={"ms-3"} onClick={() => setShouldShowHelp(true)}>
					Show Help
				</Button>
			}
		  </div>
		  {selectedCountries && selectedCountries[modalIndex] &&
		  	<DetailsModal
		  		modalOpen={modalOpen}
		  		index={modalIndex}
		  		total={selectedCountries.length}
		  		country={selectedCountries[modalIndex]}
		  		onClose={closeModal}
		  		onNext={() => onNext(modalIndex)}
		  		onPrev={() => onPrev(modalIndex)}
		  		hasNext={hasNext(modalIndex)}
		  		hasPrev={hasPrev(modalIndex)}
		  		notes={selectedNotes[modalIndex]}
		  		setNotes={(text) => {setNotes(modalIndex, text)}}
		  	/>
		  }
		</div>
    );
}

export default ItineraryComponent;
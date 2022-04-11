import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import config from "../config.json";

import CountryComponent from './CountryComponent';

function ItineraryComponent() {
	const [countries, setCountries] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [regenerate, setRegenerate] = useState(false);

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
	}

	const removeCountry = (country) => {
		const index = selectedCountries.indexOf(country);
		if(index > -1) {
			let newSelected = [...selectedCountries];
			newSelected.splice(index, 1);
			console.log(newSelected);
			setSelectedCountries(newSelected);
		}
	}

	const getRandomInt = (max) => {
	  return Math.floor(Math.random() * max);
	}

	const getCountries = async() => {
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
	};

	const onClickButton = async() => {
		if(countries.length == 0) {
			getCountries();
		}
		setRegenerate(true);
	}

	const fetchPage = async(page) => {
		const data = await fetch(config.apiUrl+"&page="+page).then(res => res.json());

		return data;
	};

	return (
		<div>
			{
				selectedCountries && selectedCountries.map((country) => {
					return (
						<CountryComponent country = {country} removeCountry={() => removeCountry(country)}/>
					);
				})
			}
			<div className="text-center">
				<Button variant="success" size="lg" onClick={onClickButton}>Generate List</Button>
			</div>
		</div>

	)
}

export default ItineraryComponent;
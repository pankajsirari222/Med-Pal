import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import "../components/searchsidebar.css";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './search.css'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState("Select a category");
	const [results, setResults] = useState(null);
	const [min, setMin] = useState(1);
	const [max, setMax] = useState(1000);
	const [distanceValue, setDistanceValue] = useState(500);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [list, setList] = useState({});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setLatitude(latitude);
			setLongitude(longitude);
			// You can now use these values to search for nearby documents
		});
	} else {
		console.log("Geolocation is not supported by this browser");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		
	};


	useEffect(()=>console.log(filters),[filters])
	return (
		<>
			<div className="sidebar">
				<Form onSubmit={handleSubmit}>
					{/* <Form.Group>
						<Form.Control
							type="text"
							name="searchQuery"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</Form.Group> */}
					<Form.Group>
						<label htmlFor="distanceSlider">
							Distance (in miles): {distanceValue}
						</label>
						<Form.Control
							type="range"
							name="distanceSlider"
							min={min}
							max={max}
							value={distanceValue}
							onChange={(e) => setDistanceValue(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<label>Category:</label>
						
						<DropdownButton title={`${filters?filters:"Select a category"}`} onSelect={(e)=>setFilters(e)}>
							
							<Dropdown.Item style={{fontSize:"15px"}} eventKey="">Select a category</Dropdown.Item>
							<Dropdown.Item style={{fontSize:"15px"}} eventKey="Cardiologist">Cardiologist</Dropdown.Item>
							<Dropdown.Item style={{fontSize:"15px"}} eventKey="Rheumatologist">Rheumatologist</Dropdown.Item>
							<Dropdown.Item style={{fontSize:"15px"}} eventKey="Pediatrician">Pediatrician</Dropdown.Item>
							<Dropdown.Item style={{fontSize:"15px"}} eventKey="General Physician">General Physician</Dropdown.Item>

						</DropdownButton>

					</Form.Group>

					<Button type="submit">Submit</Button>
				</Form>
			</div>
			<div>
				{results &&
					results.map((elem) => {
						return (
							<ul>
								<li style={{ marginLeft: "50vw" }}>
									<img
										style={{ height: "100px" }}
										src='https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
										alt="doctor img"
									/>
								</li>
								<li style={{ marginLeft: "50vw" }}>
									{elem.doctorName}
								</li>
								<li style={{ marginLeft: "50vw" }}>
									{elem.fees}
								</li>
								<li style={{ marginLeft: "50vw" }}>
									{elem.speciality}
								</li>
							</ul>
						);
					})}
			</div>
		</>
	);
};

export default Search;

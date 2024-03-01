import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
	const [file, setFile] = useState(null);

	const [image, setImage] = useState(null);

	// Set the file from the input
	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = (e) => {
		e.preventDefault();

		/*
    - Here we create a 'formData' object which just 
    allows us to put the file in with the 'fieldname' 
    of 'file'. We'll access the file with that field name
    later!
    
    */
		const formData = new FormData();
		formData.append("file", file);

		axios
			.post("http://localhost:3000/upload", formData)
			.then((res) => {
				// console.log(res.data[0].image);
			})
			.catch((err) => console.log(err));
		console.log(file);
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/getImages")
			.then((res) => {
				console.log(res);
				setImage(res.data[0].image);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h1>Multer with Mern!</h1>

			<form onSubmit={handleUpload}>
				<input type="file" onChange={handleChange} />
				<button type="submit">Upload</button>
			</form>

			{image && (
				<img src={`http://localhost:3000/public/images/${image}`} alt="" />
			)}
		</div>
	);
}


import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Modal from "./Modal";
import PropTypes from "prop-types"
import { useEffect } from "react";


AppLayout.propTypes = {
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
}
export default function AppLayout({ showModal, setShowModal}) {

	const location = useLocation();
	/*
	- ISSUE: Even if we placed setShowModal(false) on the 'start again' button, we'd still be showing the modal
		if the user was clicking the 'back' button on the browser history. 
		
	- SOLUTION: In that case, let's hide the when the route changes. So when the location changes, we'll run this effect.
		If the modal is showing then hide it.
	
	
	*/
	useEffect(() => {
		setShowModal(false);
	}, [location, setShowModal])
	 
	return (
		<div>
			<Header />
			<Modal showModal={showModal} setShowModal={ setShowModal} />

			<Outlet />
			
		</div>
	);
}
 
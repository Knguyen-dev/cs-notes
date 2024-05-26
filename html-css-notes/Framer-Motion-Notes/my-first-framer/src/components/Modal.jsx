import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const backdropVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5, // adjust duration as needed
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5, // adjust duration as needed
            when: "beforeChildren"
        },
    },
}

const modalVariants = {
    hidden: {
        // Going to start above the screen
        y: "-100vh",
        opacity: 0,
    },
    visible: {

        // Bring y coordinate down to 200 pixels, sliding down the screen
        y: 200,
        opacity: 1,
        transition: {
            /*
            - We want the sliding down animation to happen after the 
              modal's overlay has faded in. Right now, when modal mounts 
              both of our animations will play at the same time. We could 
              use 'beforeChildren' to ensure it happens after. We'll 
              also place a 0.5 second delay. So 0.5 seconds after 
              the background fades in, start the sliding effect
                

              Backdrop: 0 => 0.5 seconds
              Modal: 1 => after
            */

            delay: 0.50
            
        }

    }
}


Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
}

export default function Modal({ showModal, setShowModal }) {
    return (
        /*
        - AnimatePresence: Since we want to animate the exiting/dismounting, we 
            need to wrap our components in an AnimatePresence component.

        - mode: 'wait'. This has the same functionality as the 'exitBeforeEnter'
        attribute. Essentially we wait until the exiting animation of 
        the element completes before we begin the entering animation. So 
        like in cases where the mounting and dismounting somehow happen really quickly, 
        then there won't be irregular overlapping and snapping of the animations. 
        It will simply wait until the exit animation finishes before doing the 
        entering animation.

        Or 'the entering child waits until the exiting child has animated out'.
        */
        <AnimatePresence mode="wait">
            {showModal && (
                // Outer div is the background/overlay of the modal
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="backdrop"
                    
                >

                    <motion.div className="modal"

                    // Apply the new variant, initial and animate should be 
                    // inherited by our parent motion div.
                        variants={modalVariants}
                        
                    >
                        <p>Want to make another pizza?</p>
                        <Link to="/">
                            <button>
                                Start again
                            </button>
                            
                        </Link>
            
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

import { motion, useCycle } from "framer-motion";

// Define the animation variants
const loaderVariants = {
    animationOne: {
        x: [-20, 20],
        y: [0, -30],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5
            },
            y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.25,
                ease: "easeOut"
            },
        }
    },
    animationTwo: {
        y: [0, -40],
        x: 0,
        transition: {
            y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    }
};

export default function Loader() {
    // Cycle through the animation variants
    const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");

    return (
        <>
            <motion.div
                className="loader"
                variants={loaderVariants}
                animate={animation} // Use the current animation state
            />

            { /* By clicking button, you go to the next animation in the cycle*/}
            <button onClick={() => cycleAnimation()}>Cycle Loader</button>
        </>
    );
}

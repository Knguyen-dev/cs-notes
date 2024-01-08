/* eslint-disable react/prop-types */
/*
+ Steppers are progression components. The steps a user takes 
  when checking out, etc. Note this is supposed to be a reusable
  component, but there are many ways to do the stepper. 

+ Stepper Docs: https://mui.com/material-ui/react-stepper/
*/

import { useState } from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import CommonButton from "../CommonButton/CommonButton";

export default function ProgressStepper({ steps, stepDescription }) {
	// Steps are tracked via index
	const [activeStep, setActiveStep] = useState(0);

	// Map of key indices and values true/false to indicate whether a step
	// is finished or not
	const [completed, setCompleted] = useState({});

	const totalSteps = steps.length;
	const completedSteps = Object.keys(completed).length;

	// When all steps have been completed
	const allStepsCompleted = completedSteps === totalSteps;

	// Goes back a previous step; note you could also simply delete the index entry
	const handleBack = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = false;
		setCompleted(newCompleted);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	// Goes to the next step, making the current one as finished
	const handleNext = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// Resets our stepper
	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	return (
		<div>
			<Stepper activeStep={activeStep}>
				{/* Display stepper with its labels. Your content for your 
          page wouldn't go in the stepper itself. Remember the stepper is 
          just for progression. */}
				{steps.map((step, index) => (
					<Step key={step} completed={completed[index]}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>

			<div>
				{allStepsCompleted ? (
					<>
						<Typography>All Steps Completed</Typography>
						<CommonButton variant="contained" onClick={handleReset}>
							Reset
						</CommonButton>
					</>
				) : (
					<>
						<Typography>{stepDescription[activeStep]}</Typography>
						<CommonButton
							onClick={handleBack}
							variant="contained"
							disabled={activeStep === 0}>
							Back
						</CommonButton>

						<CommonButton onClick={handleNext} variant="contained">
							{completedSteps === totalSteps - 1 ? "Finish" : "Next"}
						</CommonButton>
					</>
				)}
			</div>
		</div>
	);
}

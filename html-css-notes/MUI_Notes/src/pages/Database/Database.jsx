import GridWrapper from "../../components/common/GridWrapper/GridWrapper";
import ProgressStepper from "../../components/common/ProgressStepper/ProgressStepper";
import BasicCard from "../../components/common/BasicCard/BasicCard";

const steps = ["Step 1", "Step 2", "Step 3"];
const stepDescription = ["Description 1", "Description 2", "Description 3"];

export default function Database() {
	return (
		<GridWrapper>
			<BasicCard
				content={
					<ProgressStepper steps={steps} stepDescription={stepDescription} />
				}
			/>
		</GridWrapper>
	);
}

/* eslint-disable react/prop-types */
// Then wrap this around your root or app.
import { StyledEngineProvider } from "@mui/material/styles";

export default function GlobalCssPriority({ children }) {
	return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}

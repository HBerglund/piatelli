import { Box, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CSSProperties } from "react";

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Header />
          <Box style={errorContainer}>
            <Typography variant="h3">Sorry! Something went wrong.</Typography>
          </Box>
          <Footer />
        </Box>
      );
    }

    return this.props.children;
  }
}
const errorContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "10rem",
  height: "100vh",
};

export default ErrorBoundary;

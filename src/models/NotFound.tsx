// import React from "react";

import { Box } from "@react-three/drei";

export default function NotFound(props:any) {
  return (
    <Box {...props} dispose={null}>
      <meshStandardMaterial color="red" />
    </Box>
  );
}
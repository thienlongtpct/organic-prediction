import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import initRDKit from "../../utils/initRDKit";
import { Box, CircularProgress } from "@mui/material";
import { TransformCanvas3D } from "../../packages/react-chemdoodle";


const Molecule3DStructure = ({
  id,
  width = 250,
  height = 250,
  structure,
}) => {
  const [mol, setMol] = useState(null);
  const [rdKitLoaded, setRdKitLoaded] = useState(true);
  const [rdKitError, setRdKitError] = useState(false);

  useEffect(() => {
    initRDKit()
      .then(() => {
        const molFromSmiles = window.RDKit.get_mol(structure || "invalid");
        const molBlocks = molFromSmiles.get_molblock();
        setMol(molBlocks);
        setRdKitLoaded(true);
        molFromSmiles?.delete();
      })
      .catch((err) => {
        console.log(err);
        setRdKitError(true);
      });

  }, [mol, structure]);

  if (rdKitError) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={width}
        height={height}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!rdKitLoaded) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={width}
        height={height}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!mol) {
    return (
      <span title={`Cannot render structure: ${structure}`}>Render Error.</span>
    );
  } else {
    return (
      <TransformCanvas3D
        id={id}
        data={{ mol }}
        width={width}
        height={height}
        style={{ border: "none" }}
      />
    );
  }
};

Molecule3DStructure.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  structure: PropTypes.string.isRequired,
};

export default Molecule3DStructure;

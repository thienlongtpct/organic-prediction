import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import initRDKit from "../utils/initRDKit";
import { Box, CircularProgress } from "@mui/material";

const MoleculeStructure = ({
  id,
  className = "",
  svgMode = false,
  width = 250,
  height = 200,
  isLoading,
  setIsLoading,
  structure,
  subStructure = "",
  extraDetails = {},
  drawingDelay,
}) => {
  const [svg, setSvg] = useState(undefined);
  const [rdKitLoaded, setRdKitLoaded] = useState(false);
  const [rdKitError, setRdKitError] = useState(false);

  const MOL_DETAILS = {
    width,
    height,
    bondLineWidth: 1,
    addStereoAnnotation: true,
    ...extraDetails,
  };

  const isValidMol = (mol) => !!mol;

  const getMolDetails = (mol, qmol) => {
    if (isValidMol(mol) && isValidMol(qmol)) {
      const subStructHighlightDetails = JSON.parse(
        mol.get_substruct_matches(qmol)
      );
      const subStructHighlightDetailsMerged = !_.isEmpty(
        subStructHighlightDetails
      )
        ? subStructHighlightDetails.reduce(
            (acc, { atoms, bonds }) => ({
              atoms: [...acc.atoms, ...atoms],
              bonds: [...acc.bonds, ...bonds],
            }),
            { bonds: [], atoms: [] }
          )
        : subStructHighlightDetails;
      return JSON.stringify({
        ...MOL_DETAILS,
        ...extraDetails,
        ...subStructHighlightDetailsMerged,
      });
    } else {
      return JSON.stringify({
        ...MOL_DETAILS,
        ...extraDetails,
      });
    }
  };

  const drawSVGorCanvas = useCallback(() => {
    const mol = window.RDKit.get_mol(structure || "invalid");
    const qmol = window.RDKit.get_qmol(subStructure || "invalid");
    const isValidMolInstance = isValidMol(mol);

    if (svgMode && isValidMolInstance) {
      const svgContent = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
      setSvg(svgContent);
    } else if (isValidMolInstance) {
      const canvas = document.getElementById(id);
      mol.draw_to_canvas_with_highlights(canvas, getMolDetails(mol, qmol));
    }

    mol?.delete();
    qmol?.delete();
  }, [structure, subStructure, svgMode, id, extraDetails, getMolDetails]);

  const draw = useCallback(() => {
    if (drawingDelay) {
      setTimeout(() => {
        drawSVGorCanvas();
      }, drawingDelay);
    } else {
      drawSVGorCanvas();
    }
  }, [drawingDelay, drawSVGorCanvas]);

  useEffect(() => {
    initRDKit()
      .then(() => {
        setRdKitLoaded(true);
        try {
          draw();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
        setRdKitError(true);
      });
  }, [draw]);

  useEffect(() => {
    if (rdKitLoaded) {
      draw();
    }
  }, [structure, svgMode, subStructure, width, height, extraDetails, rdKitLoaded, draw]);

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

  const mol = window.RDKit.get_mol(structure || "invalid");
  const isValidMolInstance = isValidMol(mol);
  mol?.delete();

  setIsLoading(false);
  if (!isValidMolInstance) {
    return (
      <span title={`Cannot render structure: ${structure}`}>
        Render Error.
      </span>
    );
  } else if (svgMode) {
    return (
      <div
        title={structure}
        className={"molecule-structure-svg " + className}
        style={{ width, height }}
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    );
  } else {
    return (
      <div className={"molecule-canvas-container " + className}>
        <canvas
          title={structure}
          id={id}
          width={width}
          height={height}
        ></canvas>
      </div>
    );
  }
};

MoleculeStructure.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  svgMode: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  structure: PropTypes.string.isRequired,
  subStructure: PropTypes.string,
  extraDetails: PropTypes.object,
  drawingDelay: PropTypes.number,
};

export default MoleculeStructure;

import { useEffect } from "react";

const TransformCanvas3D = ({ id, data, style, width = 100, height = 100 }) => {
  useEffect(() => {
    // Setup canvas
    const viewerCanvas = new window.ChemDoodle.TransformCanvas3D(
      id,
      width,
      height
    );
    viewerCanvas.styles.set3DRepresentation("Ball and Stick");
    viewerCanvas.styles.backgroundColor = "transparent";
    viewerCanvas.styles.atoms_useVDWDiameters_3D = false;
    viewerCanvas.styles.atoms_sphereDiameter_3D = 16;
    viewerCanvas.styles.atoms_usePYMOLColors = true;
    viewerCanvas.styles.atoms_displayLabels_3D = true;
    viewerCanvas.styles.bonds_cylinderDiameter_3D = 2;

    // Setup molecule
    const molecule = window.ChemDoodle.readMOL(data.mol);

    // Load molecule in canvas
    viewerCanvas.loadMolecule(molecule);
  }, [id, height, width, data]);

  return (
    <canvas
      id={id}
      style={style}
      width={width}
      height={height}
      sx={{ border: "none" }}
    />
  );
};

export default TransformCanvas3D;

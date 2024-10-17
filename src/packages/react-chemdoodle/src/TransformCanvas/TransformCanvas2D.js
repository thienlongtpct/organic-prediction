import { useEffect } from "react";

const TransformCanvas2D = ({ id, data, style, width = 100, height = 100 }) => {
  useEffect(() => {
    // Setup canvas
    const viewerCanvas = new window.ChemDoodle.TransformCanvas(
      id,
      width,
      height
    );
    viewerCanvas.styles.backgroundColor = "transparent";
    viewerCanvas.styles.atoms_font_size_2D = 32;
    viewerCanvas.styles.atoms_usePYMOLColors = true;
    viewerCanvas.styles.bonds_width_2D = 2;
    viewerCanvas.styles.bondLength_2D = 40;

    // Setup molecule
    const molecule = window.ChemDoodle.readMOL(data.mol);

    // Load molecule in canvas
    viewerCanvas.loadMolecule(molecule);
  }, [id, height, width, data]);

  return <canvas id={id} style={style} width={width} height={height} />;
};

export default TransformCanvas2D;

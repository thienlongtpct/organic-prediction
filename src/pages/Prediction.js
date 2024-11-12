import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  styled,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  Molecule2DStructure,
  Molecule3DStructure,
} from "../components/molecule-structure";
import getPredictionTheme from "../theme/getPredictionTheme";
import { useParentSize } from "@cutting/use-get-parent-size";
import { translate } from "../utils/dictionary";
import ScienceIcon from "@mui/icons-material/Science";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "800px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "1000px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "1200px",
  },
}));

const PredictionContainer = styled(Box)(() => ({
  padding: 4,
  margin: 4,
  display: "flex",
  flexDirection: "column",
}));

const OutterAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  margin: 0,
  overflow: "visible",
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2),
  },
}));

const InnerAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
  margin: 0,
  border: "none",
  overflow: "visible",
}));

const OutterAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={
      <ScienceIcon
        sx={(theme) => ({ color: theme.palette.primary.contrastText })}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: theme.spacing(0, 2),
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  boxShadow: `${theme.palette.primary.dark} 0px 0px 0px 3px`,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.primary.darker,
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotateZ(-45deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    "&:hover": {
      backgroundColor: theme.palette.primary.darker,
    },
  }),
}));

const InnerAccordionSummary = styled((props) => (
  <AccordionSummary expandIcon={<ScienceIcon />} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0, 2),
  margin: 0,
  borderRadius: 0,
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  overflow: "visible",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotateZ(-45deg)",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.lighter,
  },
  ...theme.applyStyles("dark", {
    "&:hover": {
      backgroundColor: theme.palette.primary.darker,
    },
  }),
}));

const OutterAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 0, 2, 8),
}));
const InnerAccordionDetails = styled(AccordionDetails)(() => ({
  display: "flex",
  justifyContent: "center",
  border: "none",
}));

export default function Prediction() {
  const [language, setLanguage] = React.useState(
    localStorage.getItem("language") || "vi"
  );

  const [reactant, setReactant] = React.useState("N#C[S-].O=C(Cl)c1ccco1");
  const [displayedReactant, setDisplayedReactant] = React.useState(reactant);
  const [displayedProduct, setDisplayedProduct] =
    React.useState("O=C(N=C=S)c1ccco1");

  const [reactantExpanded, setReactantExpanded] = React.useState("formula");
  const [productExpanded, setProductExpanded] = React.useState("formula");

  const customTheme = createTheme(getPredictionTheme());

  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleReactantExpanded = (keyword) => {
    if (reactantExpanded === keyword) setReactantExpanded("");
    else setReactantExpanded(keyword);
  };

  const toggleProductExpanded = (keyword) => {
    if (productExpanded === keyword) setProductExpanded("");
    else setProductExpanded(keyword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const accordionRef = React.useRef(null);
  const { width: widthAccordion = 0 } = useParentSize(accordionRef, {
    debounceDelay: 1000,
  });

  const accordionIcon = (theme) => ({
    position: "absolute",
    left: theme.spacing(-4),
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <Header language={language} toggleLanguage={toggleLanguage} />
        <PageContainer>
          <PredictionContainer>
            <Box display="flex" justifyContent="center" margin={4}>
              <img
                src="logo.png"
                width={256}
                alt="ChePred logo"
                loading="lazy"
              />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: 4,
              }}
            >
              <FormControl fullWidth>
                <TextField
                  autoComplete="reactant"
                  name="reactant"
                  required
                  fullWidth
                  id="reactant"
                  placeholder={translate("Reactants", language)}
                  value={reactant}
                  onChange={(event) => {
                    setReactant(event.target.value);
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // disabled={isReactantLoading || isProductLoading}
                            onClick={() => {
                              setDisplayedReactant(reactant);
                              let productFake = "";
                              if (reactant === "NC@@HC(=O)O.S=C=S")
                                productFake = "O=C(O)C1CSC(=S)N1";
                              else if (reactant === "BrCCCCCCC1CC1.O=C=O")
                                productFake = "O=C(O)CCCCCCC1CC1";
                              else if (reactant === "CCCCCC(=O)CCCCC.NO")
                                productFake = "CCCCCC(CCCCC)=NO";
                              else if (reactant === "N#C[S-].O=C(Cl)c1ccco1")
                                productFake = "O=C(N=C=S)c1ccco1";
                              else if (
                                reactant === "Cc1nccn1CCCl.[N-]=[N+]=[N-]"
                              )
                                productFake = "Cc1nccn1CCN=[N+]=[N-]";
                              else if (reactant === "CCCCCC/C=C/C(=O)Cl")
                                productFake = "CCCCCC/C=C/C=O";
                              else if (reactant === "CCCCCC/C=C/C=O")
                                productFake = "CCCCCC/C=C/CO";
                              else if (reactant === "COC(=O)C(N=[N+]=[N-])OC")
                                productFake = "COC(N=[N+]=[N-])C(=O)O";
                              else if (reactant === "COC(=O)CO.COCCl")
                                productFake = "COCOCC(=O)OC";
                              else if (reactant === "CNO.Nc1cccnc1.O=N[O-]")
                                productFake = "CN+=NNc1cccnc1";
                              else {
                                const randomProductFake = [
                                  "NC@@HC(=O)O.S=C=S",
                                  "O=C(O)C1CSC(=S)N1",
                                  "BrCCCCCCC1CC1.O=C=O",
                                  "O=C(O)CCCCCCC1CC1",
                                  "CCCCCC(=O)CCCCC.NO",
                                  "CCCCCC(CCCCC)=NO",
                                  "N#C[S-].O=C(Cl)c1ccco1",
                                  "O=C(N=C=S)c1ccco1",
                                  "Cc1nccn1CCCl.[N-]=[N+]=[N-]",
                                  "Cc1nccn1CCN=[N+]=[N-]",
                                  "CCCCCC/C=C/C(=O)Cl",
                                  "CCCCCC/C=C/C=O",
                                  "CCCCCC/C=C/CO",
                                  "COC(=O)C(N=[N+]=[N-])OC",
                                  "COC(N=[N+]=[N-])C(=O)O",
                                  "COC(=O)CO.COCCl",
                                  "COCOCC(=O)OC",
                                  "CNO.Nc1cccnc1.O=N[O-]",
                                  "CN+=NNc1cccnc1",
                                  "COC(=O)C(N=[N+]=[N-])OC",
                                  "COC(N=[N+]=[N-])C(=O)O",
                                  "CCCCC",
                                  "CNO.Nc1cccnc1.O=N[O-]",
                                  "CN+=NNc1cccnc1",
                                  "COCOCC(=O)OC",
                                  "COC(=O)CO.COCCl",
                                  "CCCCCC/C=C/C=O",
                                  "C1CCCCC1",
                                  "BrCCCCCCC1CC1.O=C=O",
                                  "CN+=NNc1cccnc1",
                                  "COCOCC(=O)OC",
                                  "CCCCCC(CCCCC)=NO",
                                  "CCCCCC/C=C/C=O",
                                ];
                                productFake =
                                  randomProductFake[
                                    Math.floor(
                                      Math.random() * randomProductFake.length
                                    )
                                  ];
                              }
                              setDisplayedProduct(productFake);
                            }}
                          >
                            {translate("Predict", language)}
                          </Button>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </FormControl>
            </Box>

            <OutterAccordion>
              <OutterAccordionSummary
                aria-controls="reactant-content"
                id="reactant-header"
              >
                <Typography component="h2" variant="p">
                  {translate("Reactants", language)}
                </Typography>
              </OutterAccordionSummary>
              <OutterAccordionDetails>
                <InnerAccordion
                  expanded={reactantExpanded === "formula"}
                  onChange={() => toggleReactantExpanded("formula")}
                >
                  <InnerAccordionSummary
                    aria-controls="reactant-formula-content"
                    id="reactant-formula-header"
                  >
                    <ScienceIcon
                      color="primary"
                      sx={accordionIcon}
                    ></ScienceIcon>
                    {translate("Formula", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {displayedReactant}
                    </Typography>
                  </InnerAccordionDetails>
                </InnerAccordion>
                <InnerAccordion
                  expanded={reactantExpanded === "2d"}
                  onChange={() => toggleReactantExpanded("2d")}
                >
                  <InnerAccordionSummary
                    aria-controls="reactant-2d-content"
                    id="reactant-2d-header"
                  >
                    <LooksTwoIcon
                      color="primary"
                      sx={accordionIcon}
                    ></LooksTwoIcon>
                    {translate("Structure diagram", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails ref={accordionRef}>
                    <Molecule2DStructure
                      id="reactant-2d-molecule"
                      structure={displayedReactant}
                      width={Math.round(widthAccordion)}
                      height={Math.min(400, Math.round(widthAccordion))}
                    />
                  </InnerAccordionDetails>
                </InnerAccordion>
                <InnerAccordion
                  expanded={reactantExpanded === "3d"}
                  onChange={() => toggleReactantExpanded("3d")}
                >
                  <InnerAccordionSummary
                    aria-controls="reactant-3d-content"
                    id="reactant-3d-header"
                  >
                    <Looks3Icon color="primary" sx={accordionIcon}></Looks3Icon>
                    {translate("3D structure", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    <Molecule3DStructure
                      id="reactant-3d-molecule"
                      structure={displayedReactant}
                      width={Math.round(widthAccordion)}
                      height={Math.min(400, Math.round(widthAccordion))}
                    />
                  </InnerAccordionDetails>
                </InnerAccordion>
              </OutterAccordionDetails>
            </OutterAccordion>

            <OutterAccordion>
              <OutterAccordionSummary
                aria-controls="product-content"
                id="product-header"
              >
                <Typography component="h2" variant="p">
                  {translate("Products", language)}
                </Typography>
              </OutterAccordionSummary>
              <OutterAccordionDetails>
                <InnerAccordion
                  expanded={productExpanded === "formula"}
                  onChange={() => toggleProductExpanded("formula")}
                >
                  <InnerAccordionSummary
                    aria-controls="product-formula-content"
                    id="product-formula-header"
                  >
                    <ScienceIcon
                      color="primary"
                      sx={accordionIcon}
                    ></ScienceIcon>
                    {translate("Formula", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    <Typography variant="subtitle2" fontStyle="italic">
                      {displayedProduct}
                    </Typography>
                  </InnerAccordionDetails>
                </InnerAccordion>
                <InnerAccordion
                  expanded={productExpanded === "2d"}
                  onChange={() => toggleProductExpanded("2d")}
                >
                  <InnerAccordionSummary
                    aria-controls="product-2d-content"
                    id="product-2d-header"
                  >
                    <LooksTwoIcon
                      color="primary"
                      sx={accordionIcon}
                    ></LooksTwoIcon>
                    {translate("Structure diagram", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    <Molecule2DStructure
                      id="product-2d-molecule"
                      structure={displayedProduct}
                      width={Math.round(widthAccordion)}
                      height={Math.min(400, Math.round(widthAccordion))}
                    />
                  </InnerAccordionDetails>
                </InnerAccordion>
                <InnerAccordion
                  expanded={productExpanded === "3d"}
                  onChange={() => toggleProductExpanded("3d")}
                >
                  <InnerAccordionSummary
                    aria-controls="product-3d-content"
                    id="product-3d-header"
                  >
                    <Looks3Icon color="primary" sx={accordionIcon}></Looks3Icon>
                    {translate("3D structure", language)}
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    <Molecule3DStructure
                      id="product-3d-molecule"
                      structure={displayedProduct}
                      width={Math.round(widthAccordion)}
                      height={Math.min(400, Math.round(widthAccordion))}
                    />
                  </InnerAccordionDetails>
                </InnerAccordion>
              </OutterAccordionDetails>
            </OutterAccordion>
          </PredictionContainer>
        </PageContainer>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

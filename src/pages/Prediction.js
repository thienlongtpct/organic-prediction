import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Paper as MuiPaper,
  Grid2 as Grid,
  createTheme,
  ThemeProvider,
  styled,
  Divider as MuiDivider,
} from "@mui/material";
import MainBar from "../bar";
import MoleculeStructure from "../components/MoleculeStructure";
import getPredictionTheme from "../theme/getPredictionTheme";
import { useParentSize } from "@cutting/use-get-parent-size";
import { translate } from "../utils/dictionary";

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
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
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const PredictionContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  margin: 4,
  // backgroundImage:
  //   "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  // backgroundRepeat: "no-repeat",
  // ...theme.applyStyles("dark", {
  //   backgroundImage:
  //     "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  // }),
}));

const BigScreenGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "initial",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const SmallScreenGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    display: "initial",
  },
}));

export default function Prediction() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "material"
  );
  const [language, setLanguage] = React.useState(
    localStorage.getItem("language") || "vi"
  );
  const [mode, setMode] = React.useState("light");

  const [reactant, setReactant] = React.useState("N#C[S-].O=C(Cl)c1ccco1");
  const [displayedReactant, setDisplayedReactant] = React.useState(
    "N#C[S-].O=C(Cl)c1ccco1"
  );
  const [product, setProduct] = React.useState("O=C(N=C=S)c1ccco1");
  const [displayedProduct, setDisplayedProduct] =
    React.useState("O=C(N=C=S)c1ccco1");

  const [isReactantLoading, setIsReactantLoading] = React.useState(true);
  const [isProductLoading, setIsProductLoading] = React.useState(true);

  const materialTheme = createTheme({ palette: { mode } });
  const customTheme = createTheme(getPredictionTheme(mode));

  React.useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const selectTheme = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (newMode === "dark") {
      document.body.style.backgroundImage =
        "url('/background-dark.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('/background-light.jpg')";
    }
    localStorage.setItem("mode", newMode);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const gridItemRef = React.useRef(null);
  const { width: widthGrid = 0 } = useParentSize(gridItemRef, {
    debounceDelay: 1000,
  });

  return (
    <MainBar
      theme={theme}
      selectTheme={selectTheme}
      language={language}
      toggleLanguage={toggleLanguage}
      mode={mode}
      toggleMode={toggleMode}
    >
      <ThemeProvider theme={theme === "custom" ? customTheme : materialTheme}>
        <CssBaseline enableColorScheme />
        <PredictionContainer direction="column" justifyContent="space-between">
          <Stack sx={{ justifyContent: "center", height: "100dvh", p: 2 }}>
            <Paper
              variant="outlined"
              className={mode === "dark" ? "dark-mode" : "light-mode"}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                {translate("Organic Chemistry Reaction Prediction", language)}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Divider variant="middle" />
                  </Grid>

                  <BigScreenGrid size={12}>
                    <Typography component="h2" variant="p">
                      {translate("SMILES inputs", language)}
                    </Typography>
                  </BigScreenGrid>

                  <SmallScreenGrid size={12}>
                    <Typography component="h2" variant="p">
                      {translate("Reactants", language)}
                    </Typography>
                  </SmallScreenGrid>

                  <Grid size={{ xs: 12, md: 6 }} ref={gridItemRef}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="reactant">
                        <Typography variant="subtitle2">
                          {translate("Reactants", language)}
                        </Typography>
                      </FormLabel>
                      <TextField
                        autoComplete="reactant"
                        name="reactant"
                        required
                        fullWidth
                        id="reactant"
                        placeholder={translate("Known reactants", language)}
                        value={reactant}
                        onChange={(event) => {
                          setReactant(event.target.value);
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <SmallScreenGrid size={{ xs: 12, md: 6 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isReactantLoading || isProductLoading}
                      onClick={() => {
                        setIsReactantLoading(true);
                        setIsProductLoading(true);
                        setDisplayedProduct(product);
                        setDisplayedReactant(reactant);
                      }}
                    >
                      {translate("Predict", language)}
                    </Button>
                    <Divider variant="middle">
                      {translate("Result", language)}
                    </Divider>
                    <Typography component="h2" variant="p">
                      {translate("Products", language)}
                    </Typography>
                  </SmallScreenGrid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="product">
                        <Typography variant="subtitle2">
                          {translate("Products", language)}
                        </Typography>
                      </FormLabel>
                      <TextField
                        autoComplete="product"
                        name="product"
                        required
                        fullWidth
                        id="product"
                        placeholder={translate("Predicted products", language)}
                        value={product}
                        disabled
                      />
                    </FormControl>
                  </Grid>

                  <BigScreenGrid size={12}>
                    <Divider variant="middle" />
                  </BigScreenGrid>

                  <Grid size={12}>
                    <Typography component="h2" variant="p">
                      {translate("Structure diagram", language)}
                    </Typography>
                  </Grid>

                  <BigScreenGrid size={{ xs: 12, md: 6 }}>
                    <MoleculeStructure
                      id="reactant-molecule"
                      structure={displayedReactant}
                      width={Math.round(widthGrid)}
                      height={Math.round(widthGrid)}
                      isLoading={isReactantLoading}
                      setIsLoading={setIsReactantLoading}
                      svgMode
                    />

                    <Typography
                      variant="subtitle2"
                      fontStyle="italic"
                      align="center"
                    >
                      {`${translate(
                        "Structure of",
                        language
                      )} ${displayedReactant}.`}
                    </Typography>
                  </BigScreenGrid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <MoleculeStructure
                      id="product-molecule"
                      structure={displayedProduct}
                      width={Math.round(widthGrid)}
                      height={Math.round(widthGrid)}
                      isLoading={isProductLoading}
                      setIsLoading={setIsProductLoading}
                      svgMode
                    />
                    <Typography
                      variant="subtitle2"
                      fontStyle="italic"
                      align="center"
                    >
                      {`${translate(
                        "Structure of",
                        language
                      )} ${displayedProduct}.`}
                    </Typography>
                  </Grid>
                  {/* 
                  <Grid size={12}>
                    <Divider variant="middle" />
                    <Typography component="h2" variant="p">
                      {translate("3D structure", language)}
                    </Typography>
                  </Grid> */}
                  <BigScreenGrid size={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isReactantLoading || isProductLoading}
                      onClick={() => {
                        setIsReactantLoading(true);
                        setIsProductLoading(true);
                        setDisplayedProduct(product);
                        setDisplayedReactant(reactant);
                      }}
                    >
                      {translate("Predict", language)}
                    </Button>
                  </BigScreenGrid>
                </Grid>
              </Box>
            </Paper>
          </Stack>
        </PredictionContainer>
      </ThemeProvider>
    </MainBar>
  );
}

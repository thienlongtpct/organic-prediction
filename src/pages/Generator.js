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
import getPredictionTheme from "../theme/getPredictionTheme";
import { translate } from "../utils/dictionary";
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getExercise, defaultExercise, prefix, isValidStudentId } from "../utils/exercise";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: "white",
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
      <ArrowDropDownIcon
        sx={(theme) => ({ color: theme.palette.primary.contrastText })}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  padding: theme.spacing(0, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: `${theme.palette.primary.main} 0px 0px 0px 3px`,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    boxShadow: `${theme.palette.primary.light} 0px 0px 0px 3px`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      boxShadow: `${theme.palette.primary.light} 0px 0px 0px 3px`,
    },
  }),
}));

const InnerAccordionSummary = styled((props) => (
  <AccordionSummary expandIcon={<ArrowDropDownIcon />} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0, 2),
  margin: 0,
  borderRadius: 0,
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  overflow: "visible",
  "&:hover": {
    backgroundColor: theme.palette.background.primary,
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
  flexDirection: "column",
  justifyContent: "center",
  border: "none",
}));

export default function Generator() {
  const [language, setLanguage] = React.useState(
    localStorage.getItem("language") || "vi"
  );

  const [studentId, setStudentId] = React.useState(BigInt(-1));
  const [fakeStudentId, setFakeStudentId] = React.useState(BigInt(-1));

  const [firstExercise, setFirstExercise] = React.useState(structuredClone(defaultExercise));
  const [secondExercise, setSecondExercise] = React.useState(structuredClone(defaultExercise));
  
  const [firstExerciseExpanded, setFirstExerciseExpanded] = React.useState("problem");
  const [secondExerciseExpanded, setSecondExerciseExpanded] = React.useState("problem");

  const customTheme = createTheme(getPredictionTheme());

  const toggleLanguage = () => {
    const newLanguage = language === "vi" ? "en" : "vi";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleFirstExerciseExpanded = (keyword) => {
    if (firstExerciseExpanded === keyword) setFirstExerciseExpanded("");
    else setFirstExerciseExpanded(keyword);
  };

  const toggleSecondExerciseExpanded = (keyword) => {
    if (secondExerciseExpanded === keyword) setSecondExerciseExpanded("");
    else setSecondExerciseExpanded(keyword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // const accordionRef = React.useRef(null);
  // const { width: widthAccordion = 0 } = useParentSize(accordionRef, {
  //   debounceDelay: 1000,
  // });

  const accordionIcon = (theme) => ({
    position: "absolute",
    left: theme.spacing(-4),
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: theme.palette.background.primary })}
      >
        <Header language={language} toggleLanguage={toggleLanguage} />
        <PageContainer>
          <PredictionContainer>
            <Box display="flex" justifyContent="center" alignItems="center" margin={4}>
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                height={120}
                alt="InICT logo"
                loading="lazy"
              />
              <div style={{ fontWeight: 700, fontSize: "32px", marginLeft: "20px", lineHeight: "36px", color: "#242056", textTransform: "uppercase" }}>
                {translate("Institue of Information Technology", language)}
                <br />
                {translate("and Communication", language)}
              </div>
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
                  autoComplete="studentId"
                  name="studentId"
                  required
                  fullWidth
                  id="studentId"
                  placeholder={translate("Student ID", language)}
                  value={fakeStudentId}
                  onChange={(event) => {
                    setFakeStudentId(event.target.value);
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => {
                              setStudentId(BigInt(fakeStudentId));
                              setFirstExercise(getExercise(fakeStudentId, 0));
                              setSecondExercise(getExercise(fakeStudentId, 1));
                            }}
                          >
                            {translate("Generate", language)}
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
                aria-controls="first-exercise-content"
                id="first-exercise-content"
                open={firstExerciseExpanded === "problem"}
              >
                <Typography component="h2" variant="p">
                  {translate("Exercise 1", language)}
                </Typography>
              </OutterAccordionSummary>
              <OutterAccordionDetails>
                <InnerAccordion
                  expanded={firstExerciseExpanded === "problem"}
                  onChange={() => toggleFirstExerciseExpanded("problem")}
                >
                  <InnerAccordionSummary
                    aria-controls="first-exercise-problem-content"
                    id="first-exercise-problem-content"
                  >
                    <DescriptionIcon
                      color="primary"
                      sx={accordionIcon}
                    ></DescriptionIcon>
                    <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {translate("Statement", language)}
                    </Typography>
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    {isValidStudentId(studentId) ? <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={16}
                      align="justify"
                    >
                      {prefix[0][language]}
                    </Typography> : null}
                    <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={16}
                      align="justify"
                      fontWeight={700}
                    >
                      {firstExercise[language]}
                    </Typography>
                  </InnerAccordionDetails>
                </InnerAccordion>
              </OutterAccordionDetails>
            </OutterAccordion>

            <OutterAccordion>
              <OutterAccordionSummary
                aria-controls="second-exercise-content"
                id="second-exercise-content"
              >
                <Typography component="h2" variant="p">
                  {translate("Exercise 2", language)}
                </Typography>
              </OutterAccordionSummary>
              <OutterAccordionDetails>
                <InnerAccordion
                  expanded={secondExerciseExpanded === "problem"}
                  onChange={() => toggleSecondExerciseExpanded("problem")}
                >
                  <InnerAccordionSummary
                    aria-controls="second-exercise-problem-content"
                    id="second-exercise-problem-content"
                  >
                    <DescriptionIcon
                      color="primary"
                      sx={accordionIcon}
                    ></DescriptionIcon>
                    <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={20}
                      fontWeight="bold"
                    >
                      {translate("Statement", language)}
                    </Typography>
                  </InnerAccordionSummary>
                  <InnerAccordionDetails>
                    {isValidStudentId(studentId) ? <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={16}
                      align="justify"
                    >
                      {prefix[1][language]}
                    </Typography> : null}
                    <Typography
                      component="p"
                      fontFamily="Serif"
                      fontSize={16}
                      align="justify"
                      fontWeight={700}
                    >
                      {secondExercise[language]}
                      </Typography>
                  </InnerAccordionDetails>
                </InnerAccordion>
              </OutterAccordionDetails>
            </OutterAccordion>
          </PredictionContainer>
        </PageContainer>
        <Footer language={language} />
      </Box>
    </ThemeProvider>
  );
}

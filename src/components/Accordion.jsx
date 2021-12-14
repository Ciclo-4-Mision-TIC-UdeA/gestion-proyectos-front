import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(() => ({
  backgroundColor: '#919191',
}));
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(() => ({
  backgroundColor: '#919191',
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(() => ({
  backgroundColor: '#ccc',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };

import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography,
  Box,
  Skeleton,
  Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: '8px 0',
  borderRadius: '8px !important',
  '&:before': {
    display: 'none',
  },
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
}));

const FaqList = ({ faqs, isLoading }) => {
  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
          </Box>
        ))}
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Frequently Asked Questions
      </Typography>
      
      {faqs.map((faq, index) => (
        <StyledAccordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6" component="h2">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Container>
  );
};

export default FaqList; 
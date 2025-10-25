import { useMemo, useState } from "react";
import {
  grommet, Box, Grommet, DataTable, Layer,
  Grid, List, Text, Accordion, AccordionPanel, Button
} from "grommet";

const MAX_ITEMS = 200;

const ExampleList = ({ data }) => (
  <List data={data}>
    {((datum, index) => (
      <Text key={index}>
        {datum.value}
      </Text>
    ))}
  </List>
);

const ExampleDataTable = ({ data, ...rest }) => (
  <DataTable data={data} columns={[
    { property: 'value', header: 'Value' },
  ]} {...rest} />
);

const ExampleAccordion = ({ data }) => (
  <Accordion>
    <AccordionPanel label={'DataTable'}>
      <ExampleDataTable data={data} />
    </AccordionPanel>
    <AccordionPanel label={'List'}>
      <ExampleList data={data} />
    </AccordionPanel>
  </Accordion>
);

function App() {
  const data = useMemo(() => {
    let i = 0;
    return new Array(MAX_ITEMS).fill().map(() => {
      let index = i++;
      return {
        value: index,
      };
    });
  });
  const [isOpen, setIsOpen] = useState(false);

  const closeLayer = () => {
    setIsOpen(false);
  };

  return (
    <Grommet theme={grommet}>
      <Box gap="medium">
        <Button label="Open Layer" onClick={() => setIsOpen(true)} />
        <Text>Examples of infinite scroll working properly in accordion</Text>
        <ExampleAccordion data={data} />
      </Box>
      {isOpen && (
        <Layer
          position="center"
          modal
          onClickOutside={() => closeLayer()}
          onEsc={() => closeLayer()}
        >
          <Box height="medium" gap="medium" overflow="auto" flex="grow">
            <Text>Examples of infinite scroll not working in an accordion in a layer</Text>
            <Button label="Close" onClick={() => closeLayer()} />
            <ExampleAccordion data={data} />
          </Box>
        </Layer>
      )}
    </Grommet >
  )
}

export default App

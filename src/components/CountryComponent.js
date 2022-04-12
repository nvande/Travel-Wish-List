import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaMinusCircle, FaBars } from 'react-icons/fa';

function CountryComponent({index, country, removeCountry, openDetails}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to view details and edit notes
    </Tooltip>
  );

  return (
    <Card className={"mb-2 p-2"}>
      <div className="countryWrapper">
        <div className="countryBody p-2">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 100 }}
            overlay={renderTooltip}
          >
            <span onClick={openDetails} className="h5 countryName">{index+1}. {country.name}</span>
          </OverlayTrigger>
          <FaBars className="reorderIcon" />
        </div>
        <FaMinusCircle onClick={removeCountry} className="removeIcon text-danger"/>
      </div>
    </Card>
  );
}

export default CountryComponent;
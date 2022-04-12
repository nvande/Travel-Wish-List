import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaMinusCircle, FaBars } from 'react-icons/fa';

function CountryComponent({index, country, removeCountry, openDetails}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to view details and edit notes
    </Tooltip>
  );


  return (
    <Card className={"mb-2 p-1"}>
      <div className="countryWrapper">
        <div className="countryBody">
          <span className={"countryNumber text-white bg-secondary ms-0 color-"+index}>{index+1}</span> 
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 100 }}
            overlay={renderTooltip}
          >
            <div onClick={openDetails} className="countryHeader p-2">
              <span className={"countryName h4 ps-5"}>{country.name}</span>
            </div>
          </OverlayTrigger>
          <FaBars className="reorderIcon" />
        </div>
        <FaMinusCircle onClick={removeCountry} className="removeIcon text-danger"/>
      </div>
    </Card>
  );
}

export default CountryComponent;
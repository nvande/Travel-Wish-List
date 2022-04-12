import { Card, Button, Tooltip, OverlayTrigger, Overlay } from 'react-bootstrap';
import { FaMinusCircle, FaBars } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

function CountryComponent({index, country, removeCountry, openDetails, shouldShowHelp, setShouldShowHelp}) {
  const renderDetailTooltip = (props) => (
    <Tooltip id={"country-tooltip"} {...props}>
      {props.verbose ? 'Click here to view country details and edit notes' : 'View Details & Notes'}
    </Tooltip>
  );

  const renderReorderTooltip = (props) => (
    <Tooltip id={"country-tooltip"} {...props}>
      {props.verbose ? 'Click & drag anywhere on an item to reorder countries in the list' : 'Drag to Reorder'}
    </Tooltip>
  );

  const renderRemoveTooltip = (props) => (
    <Tooltip id={"country-tooltip"} {...props}>
      {props.verbose ? 'Click here to remove a country from the list' : 'Remove'}
    </Tooltip>
  );

  const [showDetailTooltip, setShowDetailTooltip] = useState(false);
  const [showReorderTooltip, setShowReorderTooltip] = useState(false);
  const [showRemoveTooltip, setShowRemoveTooltip] = useState(false);
  const targetDetail = useRef(null);
  const targetReorder = useRef(null);
  const targetRemove = useRef(null);

  useEffect(()=>{
    if(index == 0 && shouldShowHelp) {
      setShowDetailTooltip(true);
      setTimeout(()=>{
        setShowDetailTooltip(false);
        setShowReorderTooltip(true);
        setTimeout(()=>{
          setShowReorderTooltip(false);
          setShowRemoveTooltip(true);
          setTimeout(()=>{
            setShowRemoveTooltip(false);
            setShouldShowHelp(false);
          }, 3000)
        }, 3000)
      }, 3000)
    }
  }, [shouldShowHelp]);

  return (
    <Card className={"mb-2 p-1"}>
      <div className="countryWrapper">
        <div className="countryBody">
          <span className={"countryNumber text-white bg-secondary ms-0 color-"+(index%10)}>{index+1}</span> 

            <OverlayTrigger
              placement="right"
              delay={{ show: 500, hide: 100 }}
              overlay={renderDetailTooltip}
            >
              <div onClick={openDetails} ref={targetDetail} className="countryHeader p-2">
                <span className={"countryName h4 ps-5"}>{country.name}</span>
              </div>
            </OverlayTrigger>

            <Overlay target={targetDetail.current} show={showDetailTooltip} placement="right">
              {renderDetailTooltip({verbose: true})}
            </Overlay>

            <OverlayTrigger
              placement="left"
              delay={{ show: 500, hide: 100 }}
              overlay={renderReorderTooltip}
            >
              <div className="reorderWrapper"  ref={targetReorder} >
                <FaBars className="reorderIcon" />
              </div>
            </OverlayTrigger>

            <Overlay target={targetReorder.current} show={showReorderTooltip} placement="left">
              {renderReorderTooltip({verbose: true})}
            </Overlay>
        </div>
        <OverlayTrigger
          placement="left"
          delay={{ show: 500, hide: 100 }}
          overlay={renderRemoveTooltip}
        >
          <div className="removeWrapper" ref={targetRemove} >
            <FaMinusCircle onClick={removeCountry} className="removeIcon text-danger"/>
          </div>
        </OverlayTrigger>
        <Overlay target={targetRemove.current} show={showRemoveTooltip} placement="left">
              {renderRemoveTooltip({verbose: true})}
            </Overlay>
      </div>
    </Card>
  );
}

export default CountryComponent;
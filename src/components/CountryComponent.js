import { Card, Button } from 'react-bootstrap';
import { FaMinusCircle} from 'react-icons/fa';

function CountryComponent({country, removeCountry}) {
  return (
    <Card className={"mb-2 p-2"}>
      <div>
        {country.name}
        <span className="d-inline-block float-end h-100 text-danger">
          <FaMinusCircle onClick={removeCountry} className="align-middle"/>
        </span>
      </div>
    </Card>
  );
}

export default CountryComponent;
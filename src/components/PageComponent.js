import FooterComponent from './FooterComponent.js';
import HeaderComponent from './HeaderComponent.js';

const footer = "This website is for demonstration purposes only.";

function PageComponent(props) {
  return (
    <div className={'container'}>
      <HeaderComponent logo=''/>
      <div className={'twlBody'}>
        
        {props.children}
        <FooterComponent footer={footer}/>
      </div>
    </div>
    
  );
}

export default PageComponent;
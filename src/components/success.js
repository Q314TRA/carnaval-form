import { Button } from 'react-bootstrap';

function SuccessComponent({ logo }) {
    let reloadPage = ()=>{
        window.location.reload()
    }
    return (<div className='main-success'>
        <img alt='logo' className='logo-success' src='http://carnavalcannabico.com/wp-content/carnaval/icono_white.png'></img>
        <div className='content-text-success' >
            <p>Gracias por hacer parte de nuestra comunidad, <wbr />reclama tu obsequio en el punto autorizado del evento, <br />¡Buenos humos!</p>
            <br />
            <p> Qué nuestro actos sea la carta de presentación.<br /> Babilonia no le temo a tu amenaza</p>
            <span>Obsequios hasta agotar existencias de los patrocinadores.</span>
        </div>
        <div className='content-button-success '>
            <a href='https://carnavalcannabico.com/' className='btn btn-cancel' variant="light">Volver al sitio.</a>
            <Button type='submit' onClick={reloadPage} className='btn-save' variant="light">Nueva encuesta</Button>
        </div>

    </div>);
}

export default SuccessComponent;
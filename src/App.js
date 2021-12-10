import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Input from './components/input';
import Select from './components/select';
import Options from './components/options';

import questions from './assets/questions.json'
import SuccessComponent from './components/success';

import axios from 'axios'




function App() {

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
  const [state, setState] = useState({});
  const [isDelivery, setDelivery] = useState(false);

  let setData = (data) => {
    setState({
      ...state,
      ...data
    })
  }

  let saveInfo = (data) => {


    let _data = questions.map(item => {
      switch (item.type) {
        case 'radio':
          return {
            key: item.key,
            value: data[item.key] ? data[item.key].join(',') : undefined
          }
        default:
          return {
            key: item.key,
            value: data[item.key]
          }
      }
    }).filter(item=>item.value).reduce((a,b)=>{
      a[b.key] = b.value;
      return a;
    }, {});
    
    axios.post(`http://137.184.82.45:3000/carnaval`,_data)
      .then(function (response) {
        setDelivery(!isDelivery);
      })
  }

  let swtchComponents = (item) => {

    switch (item.type) {
      case 'text':
        return <Input register={register} errors={errors} item={item} type='text' onChange={setData} />
      case 'number':
        return <Input register={register} errors={errors} item={item} type='tel' onChange={setData} />
      case 'select':
        return <Select register={register} errors={errors} item={item} onChange={setData} watch={watch} />
      case 'option':
        return <Options type="checkbox" control={control} errors={errors} item={item} onChange={setData} watch={watch} />
      case 'radio':
        return <Options type="radio" control={control} errors={errors} item={item} onChange={setData} watch={watch} />
      default:
        return <Input register={register} errors={errors} item={item} type='text' onChange={setData} />
    }
  }

  if (isDelivery)
    return <SuccessComponent />

  return (
    <Container fluid className='main'>
      <Row className='content-banner mb-5'>

        <Col md={7} lg={8} className='banner-right' style={{ backgroundImage: `url(http://carnavalcannabico.com/wp-content/carnaval/olmes.jpg)` }} >
          <span>Carnaval cannabico 2021</span>
        </Col>
        <Col md={5} lg={4} className='banner-left'  >
          <img alt='logo' src='http://carnavalcannabico.com/wp-content/carnaval/icono_white.png' />
        </Col>
      </Row>

      <Row className='main-form px-4' >
        <form onSubmit={handleSubmit(saveInfo)} >
          {questions.map((question) => {
            return <Col className='mb-4' md={{ span: "6", offset: '3' }} sm={12}  >
              {swtchComponents(question)}
            </Col>
          })}
          <Col className='mb-4' md={{ span: "6", offset: '3' }} sm={12}  >
            <Form.Group className="mb-3" >
              <Controller
                control={control}
                name={'allowPub'}
                defaultValue={false}
                render={({
                  field: { onChange, value }
                }) =>
                  <div key={`content-allowPub`} className="mb-3 px-1">
                    <Form.Check
                      type='checkbox'
                      id={`option-allowPub`}
                      label={"Autorizo al carnaval para que el número de celular, sea tratado para contactarme y/o enviarme la información relacionada a la industria cannabica."}
                      value={"Autorizo al carnaval para que el número de celular, sea tratado para contactarme y/o enviarme la información relacionada a la industria cannabica."}
                      checked={value}
                      onChange={(val) => onChange(val.target.checked)}
                    />
                  </div>

                }
              />

              <hr className='border-bottom' />
            </Form.Group>

            <Form.Group className="mb-3">
              <Controller
                control={control}
                name={'allowPrivacity'}
                rules={{ required: true }}
                defaultValue={false}
                render={({
                  field: { onChange, value }
                }) =>
                  <div key={`content-allowPrivacity`} className="mb-3 px-1">
                    <Form.Check
                      type='checkbox'
                      id={`option-allowPrivacity`}
                    >

                      <Form.Check.Input isValid={errors.allowPrivacity} value="allowPrivacity" checked={value} type='checkbox' onChange={(val) => onChange(val.target.checked)} />
                      <Form.Check.Label>Ver Términos, Condiciones y Políticas de Privacidad para la solicitud de productos (<a href='https://carnavalcannabico.com/'>Ver</a>).</Form.Check.Label>
                      <Form.Control.Feedback type="valid" className="text-danger">Este campo es requerido.</Form.Control.Feedback>


                    </Form.Check>
                  </div>

                }
              />


              <hr className='border-bottom' />
            </Form.Group>

          </Col>

          <Col className='mb-4 content-buttons' md={{ span: "6", offset: '3' }} sm={12}  >
            <a href='https://carnavalcannabico.com/' className='btn btn-cancel' variant="light">Volver al sitio.</a>
            <Button type='submit' className='btn-save' variant="light">Guardar</Button>
          </Col>

        </form>
      </Row>

    </Container>
  );
}

export default App;

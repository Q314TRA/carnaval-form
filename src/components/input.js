import { Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import FormComponent from './formWraper';

function Input({ item, onChange, type, register, errors }) {

    // return (<FormComponent onChange={onChange} ref={refFrom} component={(register, errors) => {
    return <Form.Group className="mb-3" controlId={item.key}>
        <Form.Label>{item.name}</Form.Label>
        <Form.Control type={type} placeholder={`Ingrese su ${String(item.name).toLocaleLowerCase()}`} {...register(item.key, { required: item.required })} />
        {errors[item.key] &&
            <Form.Text className="text-danger">
                Este campo es requerido.
            </Form.Text>
        }
    </Form.Group>

    // }} />);
}


export default Input;
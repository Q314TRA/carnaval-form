import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

function Form({ onChange, component }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (<Col>
        <form onSubmit={handleSubmit(onChange)} >
            <Row>
                {component(register,errors )}
            </Row>
        </form>
    </Col>);

}

export default Form;
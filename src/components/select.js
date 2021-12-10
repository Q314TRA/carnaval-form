import { Form } from 'react-bootstrap';

function Select({ item, onChange, watch, register, errors }) {

    let _options = [];
    let isShow = true;

    if (Array.isArray(item.options)) {
        _options = item.options;
    } else if (item.depend && watch(item.depend)) {
        _options = item.options[watch(item.depend)];
    }

    if (item.showIf) {

        let globalValue = watch(item.depend);
        let valuesValidate = Array.isArray(globalValue) ? globalValue : [globalValue];

        isShow = item.showIf.reduce((a, b) => {
            return a || valuesValidate.indexOf(b) > -1
        }, false)
    }

    if (!isShow)
        return (<></>)

    return <Form.Group className="mb-3" controlId={item.key}>
        <Form.Label>{item.name}</Form.Label>

        <Form.Select {...register(item.key, { required: item.required })}  >
            <option></option>
            {
                _options.map(item => <option value={item}>{item}</option>)
            }

        </Form.Select>

        {errors[item.key] &&
            <Form.Text className="text-danger">
                Este campo es requerido.
            </Form.Text>
        }
    </Form.Group>
}


export default Select;
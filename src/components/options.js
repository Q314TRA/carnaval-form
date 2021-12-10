import { useState } from 'react'
import { Form } from 'react-bootstrap';
import { Controller } from "react-hook-form";


function Option({ item, watch, errors, control, type }) {

    const [checked, setChecked] = useState({});

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

    let _onchanged = (value, onChange) => {
        let itemGlobalData=[value.target.value]
        if(type!=="radio"){
            let _checkedValue = checked;
            _checkedValue[value.target.value] = value.target.checked;
            setChecked(_checkedValue);
            itemGlobalData = Object.keys(_checkedValue).filter(option => _checkedValue[option]);
        }
        onChange(itemGlobalData)
    }

    if (!isShow)
        return (<></>)


    
    return <Form.Group className="mb-3" controlId={item.key}>
        <Form.Label className='mb-3'>{item.name}</Form.Label>
        <Controller
            control={control}
            name={item.key}
            key={item.key}
            rules={{ required: item.required }}
            defaultValue={[]}
            render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
            }) => _options.map((option, indx) =>
                <div key={`content-${item.key}-${indx}`} className="mb-3 px-1">
                    <Form.Check
                        type={type}
                        id={`option-${item.key}-${indx}`}
                        label={option}
                        value={option}
                        checked={value.indexOf(option)>-1}
                        onChange={(val) => _onchanged(val, onChange)}
                    />
                </div>
            )
            }
        />

        {errors[item.key] &&
            <Form.Text className="text-danger">
                Este campo es requerido.
            </Form.Text>
        }
        <hr className='border-bottom'/>
    </Form.Group>

}


export default Option;
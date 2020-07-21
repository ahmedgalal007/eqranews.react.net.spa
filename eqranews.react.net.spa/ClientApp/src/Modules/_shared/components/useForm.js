import react, { useState } from 'react';

const useForm = (initialFieldValues, validate) => {
	const [Values, setValues] = useState(initialFieldValues);
	const [Errors, setErrors] = useState({});

	const handelInputChange = e => {
		const { name, value } = e.target;
		const fieldValue = { [name]: value };
		setValues({ ...Values, ...fieldValue });
		validate(fieldValue);
	};

	return {
		Values,
		setValues,
		Errors,
		setErrors,
		handelInputChange,
	};
};

export default useForm;

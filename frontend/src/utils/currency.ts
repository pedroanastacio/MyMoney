const convertToReal = (value: number) => {
	return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

export {
	convertToReal
};
import { useState, useCallback } from "react";

export default function useInput(
	initialState: string,
): [string, (event: React.ChangeEvent<HTMLInputElement>) => void]  {
	const [value, setValue] = useState(initialState);
	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setValue(value);
	}, []);
	return  [value, onChange];
};
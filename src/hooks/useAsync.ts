/** @format */

import { useState, useEffect } from "react";

type FilterFnType = (data: any[], filterValue: string) => any[];

export const useAsync = (
	asyncFn: () => Promise<any[]>,
	filterFn: FilterFnType,
	filterValue: string,
	dependencies: any[] = []
): [any[], boolean, any] => {
	const [value, setValue] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const result = await asyncFn();
				const filteredResult = filterFn(result, filterValue);
				setValue(filteredResult);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, dependencies);

	return [value, loading, error];
};

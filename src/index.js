import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

function App() {
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

	//const [dates, setDates] = useState([]);
	const [values, setValues] = useState([]);

	useEffect(() => {
		d3.json(url).then((data) => {
			//setDates((dates) => [...dates, data.data.map((x) => x[0])]);
			//setValues((values) => [...values, data.data.map((x) => x[1])]);
			setValues(data.data);
		});
	}, []);

	//console.log('ssssssssssssssss',d3.max(values.map(x=>x[1])));
	const w = 500;
	const h = 500;
	const padding = 30;
	const ref = useRef();
	useEffect(() => {
		//console.log('aaaa',values[8]);
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(values.map((x) => x[1]))])
			.range([h - padding, padding]);
		console.log(yScale(18064.7), d3.max(values.map((x) => x[1])));
		const svgElement = d3.select(ref.current);
		svgElement.attr("width", w).attr("height", h);
		svgElement
			.selectAll("rect")
			.data(values.map((x) => x[1]))
			.enter()
			.append("rect")
			.attr("x", (d, i) => i)
			.attr("y", (d) => h - yScale(d))
			.attr("width", 25)
			.attr("height", (d) => h - yScale(d))
			.attr("fill", "navy")
			.attr("class", "bar")
			.append("title")
			.text((d) => d);
		svgElement
			.selectAll("text")
			.data(values.map((x) => x[1]))
			.enter()
			.append("text")
			.text((d) => d)
			.attr("x", (d, i) => i)
			.attr("y", (d) => h - (yScale(d) + 3));
	}, [values]);

	/*const svg = d3
		.select("body")
		.append("svg")
		*/
	return <svg ref={ref} />;
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
//https://www.codingame.com/playgrounds/3387/scales-and-axes-in-d3
//https://ru.reactjs.org/docs/hooks-state.html
//https://www.freecodecamp.org/learn/
//https://wattenberger.com/blog/react-and-d3

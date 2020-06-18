import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

function App() {
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
	const [values, setValues] = useState([]);
	useEffect(() => {
		d3.json(url).then((data) => {
			setValues(data.data);
		});
	}, []);
	const w = 1200;
	const h = 300;
	const padding = 0;
	const ref = useRef();
	useEffect(() => {
		const dates = values.map((x) => new Date(x[0]));
		const billions = values.map((x) => x[1]);
		const xScale = d3
			.scaleTime()
			.domain([d3.min(dates), d3.max(dates)])
			.range([padding, w - padding]);
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(billions)])
			.range([padding, h - padding]);
		const svgElement = d3.select(ref.current);
		const xAxis = d3.axisBottom(xScale);
		const yAxisScale = d3
			.scaleLinear()
			.domain([0, d3.max(billions)])
			.range([h - padding, padding]);
		const yAxis = d3.axisLeft(yAxisScale);
		svgElement.attr("width", w + 100).attr("height", h + 60);
		svgElement
			.selectAll("rect")
			.data(billions.map((x) => yScale(x)))
			.enter()
			.append("rect")
			.attr("data-date", function(d, i) {
				return values[i][0];
			})
			.attr("data-gdp", function(d, i) {
				return values[i][1];
			})
			.attr("x", (d, i) => 60 + xScale(dates[i]))
			.attr("y", (d) => h - padding - d)
			.attr("width", w / values.length - 1.5)
			.attr("height", (d) => d)
			.attr("fill", "tomato")
			.attr("class", "bar")
			.append("title")
			.attr("id", "tooltip");
		/*.text((d) => d);*/
		svgElement
			.append("g")
			.attr("transform", "translate(60, " + (h - padding) + ")")
			.attr("id", "x-axis")
			.call(xAxis);
		svgElement
			.append("g")
			.attr("transform", "translate(60,0)")
			.attr("id", "y-axis")
			.call(yAxis);
	}, [values]);
	return <svg ref={ref} />;
}

ReactDOM.render(
	<React.StrictMode>
		<div id="title">Gross Domestic Product, Billions of Dollars</div>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
//https://www.codingame.com/playgrounds/3387/scales-and-axes-in-d3
//https://ru.reactjs.org/docs/hooks-state.html
//https://www.freecodecamp.org/learn/
//https://wattenberger.com/blog/react-and-d3

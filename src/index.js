import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import "./Maain.css";

function App() {
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
	const [values, setValues] = useState([]);
	useEffect(() => {
		d3.json(url).then((data) => {
			setValues(data.data);
		});
	}, []);
	const w = window.innerWidth;
	const h = window.innerHeight;
	const padding = 50;
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
			.range([0, h - padding]);
		const svgElement = d3.select(ref.current);
		const xAxis = d3.axisBottom(xScale);
		const yAxisScale = d3
			.scaleLinear()
			.domain([0, d3.max(billions)])
			.range([h - padding, 0]);
		const yAxis = d3.axisLeft(yAxisScale);
		const f = d3.format(".1f");
		svgElement.attr("width", w).attr("height", h);
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
			.attr("x", (d, i) => xScale(dates[i]))
			.attr("y", (d) => h - padding - d + 10)
			.attr("width", f(w / values.length))
			.attr("height", (d) => d)
			.attr("fill", "#163D57")
			.attr("class", "bar")
			.append("title")
			.attr("id", "tooltip");
		/*.text((d) => d);*/
		svgElement
			.append("g")
			.attr("transform", "translate(0," + (h - padding + 10) + ")")
			.attr("id", "x-axis")
			.call(xAxis);
		svgElement
			.append("g")
			.attr("transform", "translate(" + padding + ",10)")
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

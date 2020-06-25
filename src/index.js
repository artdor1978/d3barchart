import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import "./Maain.css";

function App() {
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
	const [values2, setValues] = useState([]);
	useEffect(() => {
		d3.json(url).then((data) => {
			setValues(data.data);
		});
	}, []);
	const values = values2.slice(0, 15);
	
	const ref = useRef();
	useEffect(() => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const padding = 50;
		const barWidth = (w - 2 * padding) / values.length;
		const dates = values.map((x) => new Date(x[0]));
		const billions = values.map((x) => x[1]);

		const xScale = d3
			.scaleTime()
			.domain([d3.min(dates), d3.max(dates)])
			.range([padding, w - padding]); //[barWidth / 2, w - barWidth / 2]);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(billions)])
			.range([h - padding, padding]);
		const svgElement = d3.select(ref.current);
		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);
		//console.log(new Date(d3.min(values.map((x) => x[0]))), d3.min(dates));
		svgElement.attr("width", w).attr("height", h);
		svgElement
			.selectAll("rect")
			.data(values)
			.enter()
			.append("rect")
			.attr("x", (d) => xScale(new Date(d[0])))
			.attr("y", (d) => yScale(d[1]))
			.attr("width", barWidth)
			.attr("height", (d) => h - padding - yScale(d[1]))
			.attr("fill", "#163D57")
			.attr("class", "bar")
			.attr("data-date", (d) => d[0])
			.attr("data-gdp", (d) => d[1])
			.append("title")
			.attr("id", "tooltip");
		svgElement
			.append("g")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.attr("id", "x-axis")
			.call(xAxis);
		svgElement
			.append("g")
			.attr("transform", "translate(" + padding + ",0)")
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
//http://jsfiddle.net/aWJtJ/8/

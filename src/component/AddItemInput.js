import React, { useState } from "react";
import PropTypes from "prop-types";

function AddItemInput({ addItemValue }) {
	const [inputValue, setInputValue] = useState("");

	function inputController(e) {
		setInputValue(e.target.value);
	}

	function keyDownController(e) {
		if (e.key === "Enter") return keyDownEnterEvent(e);
		return false;
	}

	function keyDownEnterEvent(e) {
		addItemValue(inputValue);
		return setInputValue("");
	}

	return (
		<div className="input_adder_container">
			<input
				value={inputValue}
				onChange={inputController}
				onKeyDown={keyDownController}
				className="input_adder"
			/>
		</div>
	);
}

AddItemInput.propTypes = {};

export default AddItemInput;

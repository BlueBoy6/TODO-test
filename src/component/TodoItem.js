import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function TodoItem({ item, handleDelete, handleModification }) {
	const [editState, setEditState] = useState(false);
	const [editInputValue, setEditInputValue] = useState(item.name);

	const itemRef = useRef();

	function editLabel() {
		handleModification({ ...item, name: editInputValue });
		return setEditState(false);
	}

	function editControllerInput(e) {
		return setEditInputValue(e.target.value);
	}

	function deleteItem() {
		itemRef.current.classList.add("deleted");
		return setTimeout(() => handleDelete(item.id), 300);
	}

	function keyDownController(e) {
		if (e.key === "Enter") return keyDownEnterEvent(e);
		return false;
	}

	function keyDownEnterEvent(e) {
		return editLabel();
	}

	function editerSwitch() {
		if (!editState) {
			return (
				<div className="item_valid">
					<span className="label">{item.name}</span>
					<span className="btns_container">
						<button className="btn edit" onClick={() => setEditState(true)}>
							Edit
						</button>
						<button className="btn delete" onClick={deleteItem}>
							Delete
						</button>
					</span>
				</div>
			);
		}
		if (editState) {
			return (
				<div className="item_editer_container">
					<input
						className="label_editer"
						value={editInputValue}
						onChange={editControllerInput}
						onKeyDown={keyDownController}
					/>
					<button className="btn save" onClick={editLabel}>
						Save
					</button>
				</div>
			);
		}
		return null;
	}
	return (
		<div className="item_container">
			<div ref={itemRef} className="item">
				{editerSwitch()}
			</div>
		</div>
	);
}

TodoItem.propTypes = {};

export default TodoItem;

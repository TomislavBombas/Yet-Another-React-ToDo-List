import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "./note";
import {
  faTrash,
  faNoteSticky,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  toogleCompleted(checked) {
    this.props.task.checked = !this.props.task.checked;
    this.props.callback({ ...this.props.task });
  }

  deleteTask() {
    this.props.task.completed = true;
    this.props.callback({ ...this.props.task }, false, true);
  }

  addNote(note = "") {
    this.props.task.closed = false;
    this.props.task.note = note;
    this.props.callback({ ...this.props.task });
  }

  toggleNote(id) {
    this.props.task.closed = this.props.task.closed ? false : true;
    this.props.callback({ ...this.props.task });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="task-simple">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={this.props.task.checked}
              onChange={(e) => this.toogleCompleted(this.props.task.checked)}
            />
            <label className="form-check-label">{this.props.task.title}</label>
          </div>
          {this.props.task.note == null && (
            <button className="btn" onClick={() => this.addNote()}>
              <FontAwesomeIcon icon={faNoteSticky} />
            </button>
          )}
          <button className="btn" onClick={() => this.deleteTask()}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {this.props.task.note != null && this.props.task.closed && (
            <button
              className="btn"
              onClick={(e) => {
                this.toggleNote(this.props.task.id);
              }}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          )}
        </div>
        {!this.props.task.closed && (
          <Note task={this.props.task} callback={this.props.callback} />
        )}
      </li>
    );
  }
}

export default Task;

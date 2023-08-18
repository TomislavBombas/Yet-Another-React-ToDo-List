import React, { Component } from "react";

class Note extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(value) {
    this.props.task.note = value;
    this.props.callback(this.props.task);
  }

  handleNoteSubmit(e) {
    e.preventDefault();
    this.props.task.closed = true;
    this.props.callback(this.props.task, false, true);
  }

  render() {
    return (
      <div className="note-content">
        <form className="form-note" onSubmit={this.handleNoteSubmit}>
          <textarea
            className="note-text"
            value={this.props.task.note}
            onChange={(e) => this.handleChange(e.target.value)}
          />
          <button
            className="btn btn-primary btn-save"
            onClick={(e) => {
              this.handleNoteSubmit(e, this.props.task.id);
            }}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Note;

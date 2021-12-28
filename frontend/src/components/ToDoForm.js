import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: 1, created_by: 1}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.project, this.state.created_by)
        event.preventDefault()

    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label>text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label>project</label>
                    <input type="number" className="form-control" name="project" value={this.state.project}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label>created by</label>
                    <input type="number" className="form-control" name="created_by" value={this.state.created_by}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm
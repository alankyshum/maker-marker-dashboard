import * as React from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import './editor.css';

export default class Sidebar extends React.Component {
  defaults = {
    markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
  }
  state = {
    code: this.defaults.markdown,
    readOnly: false,
    mode: 'markdown',
  }
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	}
	changeMode (e) {
		var mode = e.target.value;
		this.setState({
			mode: mode,
			code: this.defaults[mode]
		});
	}
	toggleReadOnly () {
		this.setState({
			readOnly: !this.state.readOnly
		}, () => this.refs.editor.focus());
	}
	render () {
		var options = {
			lineNumbers: true,
			readOnly: this.state.readOnly,
			mode: this.state.mode
		};
		return (
			<div>
				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
				<div style={{ marginTop: 10 }}>
					<select onChange={this.changeMode} value={this.state.mode}>
						<option value="markdown">Markdown</option>
						<option value="javascript">JavaScript</option>
					</select>
					<button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
				</div>
			</div>
		);
	}
}
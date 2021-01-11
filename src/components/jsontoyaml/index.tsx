import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';
import yml from 'js-yaml';
import Prism from 'prismjs';
import CodeView from '../commons/codeView';

const { TextArea } = Input;

class JSONtoYaml extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      yaml: '',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.Copy = this.Copy.bind(this);
    this.parseJson = this.parseJson.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  onTextAreaChange(event: any) {
    try {
      const jsonValue = JSON.parse(event.target.value);
      this.parseJson(jsonValue);
    } catch (error) {
      this.setState({
        yaml: '',
      });
    }
  }

  parseJson(value: string) {
    const yaml = yml.dump(value).toString();

    this.setState({
      yaml: `${yaml}`,
    });
  }

  Copy(event) {
    if (this.state.yaml) {
      clipboard.writeText(this.state.yaml);
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  prettyYAML(value) {
    return {
      __html: Prism.highlight(value, Prism.languages.yaml, 'yaml'),
    };
  }

  render() {
    const { yaml } = this.state;
    return (
      <Row style={{ padding: '15px', height: '100%' }}>
        <Col span={12}>
          <TextArea
            rows={23}
            onChange={this.onTextAreaChange}
            className="textarea-input"
          />
        </Col>
        <Col span={11} offset={1}>
          <Button icon={<CopyOutlined />} onClick={this.Copy}>
            Copy
          </Button>
          <CodeView code={this.prettyYAML(yaml)} language="yaml" />
        </Col>
      </Row>
    );
  }
}

export default JSONtoYaml;

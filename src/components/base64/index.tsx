import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';

const { TextArea } = Input;
const { Option } = Select;

class Base64 extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      original: null,
      result: null,
      action: 'encode',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.Copy = this.Copy.bind(this);
    this.EncodeDecode = this.EncodeDecode.bind(this);
  }

  componentDidMount() {}

  onTextAreaChange(event: any) {
    try {
      const original = event.target.value;

      this.setState((state, props) => {
        this.EncodeDecode(original, state.action);

        return {
          original,
        };
      });
    } catch (error) {
      if (event.target.value) {
        this.setState({
          original: null,
          result: error.message,
        });
      } else {
        this.setState({
          original: null,
          result: null,
        });
      }
    }
  }

  onSelectChange(value: string) {
    this.setState((state, prop) => {
      const action = value;

      this.EncodeDecode(state.original, action);

      return { action };
    });
  }

  EncodeDecode(value: string, action: string) {
    let result = '';
    switch (action) {
      case 'encode':
        result = Buffer.from(value, 'utf-8').toString('base64');
        break;
      case 'decode':
        result = Buffer.from(value, 'base64').toString('utf-8');
        break;
      default:
        break;
    }
    this.setState({
      result,
    });
  }

  Copy(event) {
    if (this.state.result) {
      clipboard.writeText(this.state.result);
    }
    return null;
  }

  render() {
    const { result } = this.state;
    return (
      <Row style={{ padding: '15px' }}>
        <Col span={12}>
          <Select
            defaultValue="encode"
            style={{ width: 120, paddingBottom: '10px', paddingRight: '5px' }}
            onChange={this.onSelectChange}
          >
            <Option value="encode">Encode</Option>
            <Option value="decode">Decode</Option>
          </Select>
          <TextArea rows={21} onChange={this.onTextAreaChange} />
        </Col>
        <Col span={11} offset={1}>
          <Button
            style={{ marginBottom: '10px' }}
            icon={<CopyOutlined />}
            onClick={this.Copy}
          >
            Copy
          </Button>
          <TextArea rows={21} value={result} />
        </Col>
      </Row>
    );
  }
}

export default Base64;
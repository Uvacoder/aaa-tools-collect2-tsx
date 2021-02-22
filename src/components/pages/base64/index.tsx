import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import Copy from '../../../utils/copy';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  t(code: string): string;
}

interface State {
  original: undefined | string;
  result: undefined | string;
  action: string;
}

class Base64 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      original: undefined,
      result: undefined,
      action: 'encode',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);

    this.EncodeDecode = this.EncodeDecode.bind(this);
  }

  componentDidMount() {}

  onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const original = event.target.value;

      this.setState((state) => {
        this.EncodeDecode(original, state.action);

        return {
          original,
        };
      });
    } catch (error) {
      if (event.target.value) {
        this.setState({
          original: undefined,
          result: error.message,
        });
      } else {
        this.setState({
          original: undefined,
          result: undefined,
        });
      }
    }
  }

  onSelectChange(value: string) {
    this.setState((state) => {
      const action = value;

      this.EncodeDecode(state.original, action);

      return { action };
    });
  }

  EncodeDecode(value: string | undefined, action: string) {
    if (value) {
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
  }

  render() {
    const { result } = this.state;

    const { t } = this.props;

    return (
      <Row style={{ padding: '15px', height: '100%' }}>
        <Col span={12}>
          <Select
            defaultValue="encode"
            style={{ width: 120, marginBottom: '5px' }}
            onChange={this.onSelectChange}
          >
            <Option value="encode">Encode</Option>
            <Option value="decode">Decode</Option>
          </Select>
          <TextArea
            rows={23}
            onChange={this.onTextAreaChange}
            className="textarea-input"
          />
        </Col>
        <Col span={11} offset={1}>
          <Button icon={<CopyOutlined />} onClick={() => Copy(result)}>
            {t('commons.buttons.copy')}
          </Button>
          <TextArea rows={23} value={result} className="textarea-input" />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(Base64);

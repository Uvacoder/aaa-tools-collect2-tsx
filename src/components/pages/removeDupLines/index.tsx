import React from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import Copy from '../../../utils/copy';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

interface State {
  result: string | undefined;
}

class RemoveDupLines extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      result: undefined,
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  componentDidMount() {}

  onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const original = event.target.value;

      this.setState((state, props) => {
        const result = original
          .split('\n')
          .filter((item: string, i: number, allItems: string[]) => {
            return i === allItems.indexOf(item);
          })
          .join('\n');

        return {
          result,
        };
      });
    } catch (error) {
      if (event.target.value) {
        this.setState({
          result: error.message,
        });
      } else {
        this.setState({
          result: undefined,
        });
      }
    }
  }

  render() {
    const { result } = this.state;
    const { t } = this.props;

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
          <Button icon={<CopyOutlined />} onClick={() => Copy(result)}>
            {t('commons.buttons.copy')}
          </Button>
          <TextArea rows={23} value={result} className="pre-response" />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(RemoveDupLines);

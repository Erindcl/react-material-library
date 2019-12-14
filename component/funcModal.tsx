import * as React from 'react';
import { Modal, Button } from 'antd';
import './style.scss';
import { render } from 'react-dom'

interface IProps {
    title: string;
    content: string;
    notice?: string;
    cancelText?: string;
    okText?: string;
    visible: boolean;
    onCancel: any;
    onOk: any;
    footer?: any;
    parentCN: any;
}

class DeleteModal extends React.Component<IProps, any> {
    state: any = {
        visible: false,
        parentDom: document.getElementsByClassName(this.props.parentCN)[0]
    }

    componentDidMount() {
        this.setState({
            visible: true
        })
    }

    handleOk = () => {
        const { parentDom } = this.state;
        this.setState({
            visible: false
        }, () => {
            this.props.onOk();
            parentDom.parentNode.removeChild(parentDom);
        })
    }

    handleCancle = () => {
        const { parentDom } = this.state;
        this.setState({
            visible: false
        }, () => {
            this.props.onCancel();
            parentDom.parentNode.removeChild(parentDom);
        })
    }

    render() {
        const { title, content, notice = '提示', cancelText = '取消', okText = '删除' } = this.props;
        const { visible, parentDom } = this.state;
        return (
            < Modal
                title={title}
                footer={null}
                onCancel={this.handleCancle}
                visible={visible}
                getContainer={parentDom || false}
            >
                <div className="delete-modal">
                    <div className="content">
                        <i style={{ fontSize: 20, color: 'orange' }} className='iconfont iconwarning'></i>
                        <div className="notice">
                            <div style={{ fontSize: 16, color: '#333333', marginBottom: 10 }}>{notice}</div>
                            <div>{content}</div>
                        </div>
                    </div>
                    <div className="footer">
                        <Button size="large" style={{ marginLeft: 8 }} onClick={this.handleOk} type="primary">{okText}</Button>
                        <Button size="large" onClick={this.handleCancle}>{cancelText}</Button>
                    </div>
                </div>
            </Modal >
        )
    }
}

export default function funcModal(props) {
    const div = document.createElement('div');
    let parentCN = 'func-modal-box';
    div.className = parentCN;
    return render(<DeleteModal parentCN={parentCN} {...props} />, document.body.appendChild(div));
}

import React, { Component } from 'react';
import css from '../styles.css';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldScroll: true,
      showNewMessageBanner: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageArray.length !== this.props.messageArray.length) {
      let messageContainer = document.getElementsByClassName(css.messageContainer)[0];
      if (messageContainer.clientHeight + messageContainer.scrollTop === messageContainer.scrollHeight) {
        console.log('User is scrolled to the bottom of messages, so do autoscroll');
        this.setState({
          shouldScroll: true,
          showNewMessageBanner: false
        });
      } else {
        console.log('User is reading old messages above the scroll, so do NOT autoscroll');
        this.setState({
          shouldScroll: false,
          showNewMessageBanner: true
        });
        setTimeout(function() {
          this.setState({showNewMessageBanner: false});
        }.bind(this), 2000);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // check to see if there are new messages incoming
      // if there are new messages, and the user is at the bottom of the message log scroll
        // then scroll down to show the message
    if (prevProps.messageArray.length !== this.props.messageArray.length) {
      let messageContainer = document.getElementsByClassName(css.messageContainer)[0];
      if (this.state.shouldScroll) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }
  }

  handleChatInputSubmit(e) {
    if (e.keyCode === 13) {
      let messageContainer = document.getElementsByClassName(css.messageContainer)[0];
      this.props.handleChatInputSubmit(e);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  render() {
    return (
      <div className={css.chatContainer}>
        <div className="brett"></div>
        <div className={css.messageContainer}>
          {this.props.messageArray.map(message => {
            return (
              <div className={css.messageInstance}>
                <div className={css.messageUsername}>{message.name}</div>
                <div className={css.messageText}>{message.text}</div>
              </div>
            );
          })}
        </div>
        <div style={{position:'relative'}}>
          <div className={css.messageInputContainer}>
            {/* for future styling: https://alistapart.com/article/expanding-text-areas-made-elegant */}
            <div className={css.newMessageAlertBanner} style={{display: this.state.showNewMessageBanner ? 'block' : 'none' }}>New Message</div>
            <input type="text" className={css.messageInput} value={this.props.chatInput} onKeyDown={this.handleChatInputSubmit.bind(this)} onChange={this.props.handleChatInputChange}/>
          </div>
        </div>
      </div>
    )
  }

}
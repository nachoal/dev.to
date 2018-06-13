import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import CodeEditor from './codeEditor';

export default class Content extends Component {
  static propTypes = {
    resource: PropTypes.object,
    onExit: PropTypes.func,
    activeChannelId: PropTypes.number,
    pusherKey: PropTypes.string,
  };
  render() {
    if (!this.props.resource) {
      return ""
    } else {
      return (
        <div className="activechatchannel__activecontent" id="chat_activecontent">
          <button
            class="activechatchannel__activecontentexitbutton"
            onClick={this.props.onExit}
            data-content="exit"
            >×</button>
            {display(this.props)}
        </div>
      );
    }
  }
}

function display(props) {
  if (props.resource.type_of === "loading-user") {
    return <div style={{height: "210px",
                      width: "210px",
                      margin:" 15px auto",
                      display: "block",
                      borderRadius: "500px",
                      backgroundColor: "#f5f6f7"}}></div>
  } else if (props.resource.type_of === "loading-user") {
    return <div style={{height: "25px",
                      width: "96%",
                      margin:" 8px auto",
                      display: "block",
                      backgroundColor: "#f5f6f7"}}></div>
  } else if (props.resource.type_of === "user") {
      return <div><img
                    src={props.resource.profile_image}
                    style={{height: "210px",
                      width: "210px",
                      margin:" 15px auto",
                      display: "block",
                      borderRadius: "500px"}} />
                <h1 style={{textAlign: "center"}}>
                  <a href={"/"+props.resource.username}>{props.resource.name}</a>
                </h1>
                <div style={{fontStyle: "italic"}}>
                  {props.resource.summary}
                </div>
             </div>
  } else if (props.resource.type_of === "article") {
    return (
            <div class="container">
              <div class="title">
                <h1>{props.resource.title}</h1>
                <h3>
                  <a href={'/'+props.resource.user.username} class="author">
                    <img class="profile-pic" src={props.resource.user.profile_image_90} alt={props.resource.user.username}/>
                    <span>{props.resource.user.name}</span>
                  </a>
                </h3>
              </div>
              <div class="body">
              <div dangerouslySetInnerHTML={{__html: props.resource.body_html}} ></div>
              </div>
            </div>)
  } else if (props.resource.type_of === "code_editor") {
    return <CodeEditor
              activeChannelId={props.activeChannelId}
              pusherKey={props.pusherKey}
            />
  }
}
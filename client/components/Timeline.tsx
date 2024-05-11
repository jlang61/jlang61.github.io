import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./styles.css";


const WorkIcon = () => <div className="work-icon">Work</div>;

export default function Timeline() {
  return (
    <div className="App">
      <h1>React Vertical Timeline</h1>
      <div className="empty">Empty Container</div>
      <VerticalTimeline>
        {/* Add className for customization */}
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="2011 - present"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#000" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">Creative Director</h3>
          <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
          <p>
            Creative Direction, User Experience, Visual Design, Project
            Management, Team Leading
          </p>
        </VerticalTimelineElement>
        {/* Add other VerticalTimelineElement components */}
      </VerticalTimeline>
    </div>
  );
}
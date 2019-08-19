import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
    }
  }

  render() {
    try {
     var percentageLabel =""
     if(typeof(this.props.percentage)==="number"){
        percentageLabel = (Math.round(this.props.percentage) * 100 / 100)+`%`;

     }

      return (
        <ProgressBarContainer>
           
        < TitleContainer >
        {this.props.title}
        </TitleContainer>
          <EmptyProgressBar
            height={this.props.barHeight ? this.props.barHeight : null}
          >
            <BarFiller style={{ width: `${this.props.percentage}%` }} />
          </EmptyProgressBar>
          <TextLabelsContainer>
            <TextLabel>{percentageLabel}</TextLabel>
            {this.props.timeRemaining? 
          (<TimeContainer>
            <svg
              fill="rgba(127,127,127,1)"
              width="14px"
              height="auto"
              version="1.1"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m50 4.168c-12.156 0-23.812 4.8281-32.41 13.422-8.5938 8.5977-13.422 20.254-13.422 32.41s4.8281 23.812 13.422 32.41c8.5977 8.5938 20.254 13.422 32.41 13.422s23.812-4.8281 32.41-13.422c8.5938-8.5977 13.422-20.254 13.422-32.41-0.011719-12.152-4.8477-23.801-13.438-32.395-8.5938-8.5898-20.242-13.426-32.395-13.438zm0 79.168v-0.003907c-8.8398 0-17.32-3.5117-23.57-9.7617s-9.7617-14.73-9.7617-23.57 3.5117-17.32 9.7617-23.57 14.73-9.7617 23.57-9.7617 17.32 3.5117 23.57 9.7617 9.7617 14.73 9.7617 23.57c-0.007812 8.8359-3.5234 17.309-9.7734 23.559s-14.723 9.7656-23.559 9.7734zm6.25-35.922 10.672 10.668-8.8398 8.8398-14.332-14.336v-27.586h12.5z" />
            </svg>
            <TimeLabel>
               {this.props.timeRemaining}
            </TimeLabel>
      </TimeContainer>):
        null
        }
          </TextLabelsContainer>
        </ProgressBarContainer>
      )
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
ProgressBar.propTypes = {
  barHeight: PropTypes.number,
  percentage: PropTypes.number,
  title: PropTypes.string,
}
ProgressBar.defaultProps = {
  percentage: "0",
  title: "",
  barHeight: 10,
}

const FadeIn = keyframes`
from{
    opacity:0;
}
to{
    opacity:1;
}
`
const TitleContainer = styled.div`
padding: 4px 0px ;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

`
const TimeLabel = styled.span`
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size:14px;
color:rgba(127,127,127,1);
margin-left:0.2em;
`
const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content:center;
  align-items:center;
  opacity:0;
  margin-bottom:0.2em;
  animation: ${FadeIn} 0.4s ease-out 0.3s forwards;

`

const TextLabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`
const TextLabel = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  opacity: 0;
  color:rgba(127,127,127,1);

  animation: ${FadeIn} 0.4s ease-out 0.3s forwards;
`
const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${FadeIn} 0.4s ease-out 0s;
`

const EmptyProgressBar = styled.div`
  position: relative;
  height: ${props => (props.height ? props.height + `px` : `10px`)};
  width: 100%;
  background: rgba(217, 217, 217, 1);
  border-radius: 0px;
  border: 0px solid #333;


 
`
const BarFiller = styled.div`
 background-color:rgba(31, 109, 255,1);
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;


`

export default ProgressBar

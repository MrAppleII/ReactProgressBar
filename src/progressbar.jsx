import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import Modal from "./progressbarmodal"

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
    }
  }

  render() {
    try {
      var percentageLabel = ""
      if (typeof this.props.percentage === "number") {
        percentageLabel = (Math.round(this.props.percentage) * 100) / 100 + `%`
      }

      return (
        <Modal modalWidth={"700px"} isVisible={this.props.isVisible}>
          < PaddingContainer>
           <p>Upload details</p>
          <ProgressBarContainer>
           <BorderContainer>
            <TitleContainer>
              <svg
                fill="rgba(127,127,127,1)"
                width="18px"
                height="18px"
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m61.25 54.871l-12-9.8984v-0.003906c-1.793-1.4766-4.2773-1.7891-6.3789-0.80078-2.1016 0.99219-3.4414 3.1094-3.4414 5.4336v19.797c0 2.3242 1.3398 4.4414 3.4414 5.4297 0.80078 0.38281 1.6797 0.58203 2.5703 0.58203 1.3945-0.011718 2.7422-0.51172 3.8086-1.4102l12-9.8984c1.3828-1.1406 2.1836-2.8398 2.1836-4.6328 0-1.7891-0.80078-3.4883-2.1836-4.6289zm-13.82 10.289v-11.32l6.8594 5.6602z" />
                  <path d="m88.559 25.852c-0.375-0.59766-0.81641-1.1562-1.3086-1.6602l-19.891-20.191c-0.69141-0.71484-1.4883-1.3203-2.3594-1.8008-0.92578-0.96094-2.2773-1.3867-3.5898-1.1289-0.38672-0.046874-0.77734-0.070312-1.1719-0.070312h-40.359c-5.5234 0-10 4.4766-10 10v78c0 2.6523 1.0547 5.1953 2.9297 7.0703s4.418 2.9297 7.0703 2.9297h60.25c2.6523 0 5.1953-1.0547 7.0703-2.9297 1.8789-1.875 2.9297-4.418 2.9297-7.0703v-57.789c-0.003906-0.44922-0.035156-0.89844-0.097656-1.3398 0.33984-1.5039-0.23047-3.0703-1.4609-4zm-11.738-0.85156h-8.6992c-1.1055 0-2-0.89453-2-2v-8.8711zm3.3008 66h-60.242c-1.1016 0-2-0.89453-2-2v-78c0-1.1055 0.89844-2 2-2h38.25v14c0 2.6523 1.0547 5.1953 2.9297 7.0703s4.418 2.9297 7.0703 2.9297h14v56c0 0.53125-0.21094 1.0391-0.58594 1.4141s-0.88281 0.58594-1.4141 0.58594z" />
                </g>
              </svg>
              <Title>
              {!this.props.error? (this.props.done? "Done" : this.props.title) : this.props.errorMessage}</Title>
              <div style={{marginLeft:'auto'}}>{this.props.fileSize}</div>
            </TitleContainer>
            <EmptyProgressBar
              height={this.props.barHeight ? this.props.barHeight : null}
            >
              <BarFiller color={!this.props.done? (this.props.error===true? 'rgba(215,30,30,1)' : undefined) : 'rgba(15,159,0,1)'} style={{ width: !this.props.done? `${this.props.percentage}%` : `100%` }} />
            </EmptyProgressBar>
            </BorderContainer>
            <TextLabelsContainer>
              <TextLabel>{this.props.done? `100%` : percentageLabel}</TextLabel>
              {this.props.timeRemaining&&!this.props.done ? (
                <TimeContainer>
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
                  <TimeLabel>{this.props.timeRemaining}</TimeLabel>
                </TimeContainer>
              ) : null}
            </TextLabelsContainer>
            <TextLabelsContainer style={{justifyContent:"flex-end"}}> {this.props.error || this.props.done? 
            <Button onClick={this.props.handleButtonClick}>{this.props.done? "Done" : this.props.error?"Cancel":"Done"}</Button>  :null
          
          }</TextLabelsContainer>
          
          </ProgressBarContainer>
          </ PaddingContainer>
        </Modal>
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
  error: PropTypes.bool,
  done: PropTypes.bool,
  isVisible: PropTypes.bool,
 fileSize:PropTypes.string,
 handleButtonClick:PropTypes.func,
}

ProgressBar.defaultProps = {
  percentage: "0",
  title: "",
  barHeight: 3,
  error:false,
  done:false,
  errorMessage:"Sorry there was an issue",
  fileSize:"",
  handleButtonClick:()=>{},
}
const Button = styled.button`
 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding:4px 20px;
    border:none;outline:none;
    background-color: rgb(57, 125, 255);
    color:white;
    font-weight:700;
  :hover{
    background-color: rgb(31, 109, 255);
  }


`
const PaddingContainer = styled.div`
padding:20px 30px;
width:100%;
`
const Title = styled.span`
  margin-left: 10px;
`
const FadeIn = keyframes`
from{
    opacity:0;
}
to{
    opacity:1;
}
`

const TitleContainer = styled.div`
  padding: 4px 8px;
  display: flex;
  min-height:1.2em;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`
const TimeLabel = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: rgba(127, 127, 127, 1);
  margin-left: 0.2em;
`
const BorderContainer = styled.div`
border-radius:0px;
border: 1px solid rgba(127,127,127,0.5);
animation: ${FadeIn} 0.4s ease-out 0s forwards;
`
const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  opacity: 0;
  margin-bottom: 0.2em;
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
  color: rgba(127, 127, 127, 1);

  animation: ${FadeIn} 0.4s ease-out 0.3s forwards;
`
const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${FadeIn} 0.4s ease-out 0s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
 
`

const EmptyProgressBar = styled.div`
  position: relative;
  height: ${props => (props.height ? props.height + `px` : `10px`)};
  width: 100%;
  background: white;
  border-radius: 0px;
  border: 0px solid #333;
`
const BarFiller = styled.div`
  background-color: ${props => props.color? props.color : "rgba(31, 109, 255, 1)"};
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
`

export default ProgressBar

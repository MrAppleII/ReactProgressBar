import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

class GenericModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // We have to set this to undefined or else the SSR compile will yell at us.
      width: undefined,
      height: undefined,
    }
  }
  handleResize = e => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  componentDidUpdate(prevProps) {
    //Lets check to see if we are visible or not
    if (this.props.isVisible !== prevProps.isVisible) {
      //Check to see if we should do this check. 
      if (this.props.isVisible === true) {
        //Since we are opening the modal, lets block scrolling.
        document.documentElement.style.overflow = "hidden"
        document.body.scroll = "no"
      }
      else{
        document.documentElement.style.overflow = "scroll"
        document.body.scroll = "yes"
      }
    }
  }

  onMaskClick = e => {
    //Undo the scrolling event blocking now that the modal is closed.
    document.documentElement.style.overflow = "scroll"
    document.body.scroll = "yes"
    this.props.onModalClose()
  }
  componentDidMount() {
    //Lets check to see if we are visible or not
    if (this.props.isVisible === true) {
      //If we are already visible, lets block scrolling.
      document.documentElement.style.overflow = "hidden"
      document.body.scroll = "no"
    }
    window.addEventListener("resize", this.handleResize)
    // This needs to be added to block scroll events.
    this.setState(
      {
        width: window.innerWidth,
        height: window.innerHeight,
      })
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }
 

  render() {
    try {
      return this.props.isVisible
        ? ReactDOM.createPortal(
            <ModelMask
              width={this.state.width + `px`}
              height={this.state.height + `px`}
            >
              <ModalWrapper onClick={this.onMaskClick}>
                <ModalContainer
                  onClick={e => {
                    // We are simply preventing the e based function up above from misfiring
                    e.stopPropagation()
                  }}
                  style={{ maxWidth: this.props.modalWidth }}
                >
                  <ModalBody>{this.props.children}</ModalBody>
                </ModalContainer>
              </ModalWrapper>
            </ModelMask>,
            document.body
          )
        : null
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return (
        <ModelMask>
          <ModalWrapper onClick={this.onMaskClick}>
            <ModalContainer
              onClick={e => {
                // We are simply preventing the e based function up above from misfiring
                e.stopPropagation()
              }}
            >
              <ModalHeader>
                <ModalHeaderCenterItem>Oops</ModalHeaderCenterItem>
              </ModalHeader>
              <ModalBody>Something went wrong here.</ModalBody>
              <ModalHeader>
                <ModalDefaultButton />
                <ModalHeaderCenterButton>
                  <div onClick={this.onModalClose}>Okay</div>
                </ModalHeaderCenterButton>

                <ModalDefaultButton />
              </ModalHeader>
            </ModalContainer>
          </ModalWrapper>
        </ModelMask>
      )
    }
  }
}

export default GenericModal

GenericModal.propTypes = {
  isVisible: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
  buttonText: PropTypes.string,
  modalWidth: PropTypes.string,
}
GenericModal.defaultProps = {
  isVisible: false,
  buttonText: "Cancel",
  modalWidth: "auto",
  onModalOpen: function() {},
  onModalClose: function() {},
}

// Styling for the Modal Components **********
const fadeInEffect = keyframes`
from {
  -webkit-transform: scale3d(1.3, 1.3, 1.3);
  transform: scale3d(1.3, 1.3, 1.3);
}
`
const ModelMask = styled.div`
  position: fixed;
  z-index: 950 !important;
  top: 0;
  left: 0;

  width: ${props => props.width || "100vw"};
  height: ${props => props.height || "100vh"};
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
`

/* This styling is for the corner buttons containing the content */

const ModalDefaultButton = styled.a`
  flex: 0 0 12px;
  cursor: pointer;
  font-weight: normal !important;
`
const ModalWrapper = styled.div`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  z-index: 999 !important;
`
/* This styling is for the actual border containing the content */
const ModalContainer = styled.div`
  margin: 0px auto;
  position: relative;
  z-index: 999 !important;
  overflow:hidden;
  padding: 0px 0px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif !important;
  transition: all 0.3s ease;
  animation: ${fadeInEffect} forwards cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-duration: 0.13s;
`
const ModalHeaderCenterItem = styled.div`
  flex-grow: 1;
  text-align: center;
  position: relative;
  z-index: 999 !important;
`
const ModalHeaderCenterButton = styled.div`
  flex-grow: 1;
  text-align: center;
  position: relative;
  z-index: 999 !important;

  cursor: pointer;
`
const ModalHeader = styled.h3`
  margin-top: 0;
  font-weight: bold;
  display: flex;
  position: relative;
  z-index: 999 !important;

  align-items: center;
  justify-content: center;
`
const ModalBody = styled.div`
  margin: 0px 0;
  position: relative;
  z-index: 999 !important;
`

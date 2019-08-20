# ReactProgressBar
 A simple progress bar for use in React.
 
 # Props 
 ```
 title="my_video.mov"  // is of type string 
 timeRemaining={"12 min"}  // is also of type string 
 barHeight={5}  // this is how high the bar is. Default is 10.
 percentage={37} // percentage is a number as well. 
 
 
  
 error={false} // If there is a problem, you can set this to true, it will make the bar red and 
 done: PropTypes.bool,  // this sets whether or not to make the bar green for when it is done. 
 isVisible: PropTypes.bool,  // sets whether or not the modal is set. 
 fileSize:PropTypes.string, // this is just a string saying the file size. 
 handleButtonClick:PropTypes.func, // this is the handler for the button at the bottom of the form. 
 errorMessage={} // this is only displayed if the error prop is true. 
 ```

# Typical Usage 

```
<ProgressBar title="my_video.mov" timeRemaining={"12 min"}  percentage={37} />

```



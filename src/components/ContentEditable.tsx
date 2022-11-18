import React , {FC, useRef} from "react"

interface Prop{
    value : string
    onChange : (e : string) => void
}

const ContentEditableWithRef : FC<Prop> = (props) => {
    const defaultValue = useRef(props.value);
  
    const handleInput = (event : any) => {
      if (props.onChange) {
        props.onChange(event.target.innerHTML);
      }
    };


  
    return (
      <div     contentEditable
        className="min-h-[6rem] outline-none"
        onInput={handleInput}
    
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      />
    );
  };

  export default ContentEditableWithRef
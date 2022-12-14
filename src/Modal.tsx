import React from 'react'
import cx from 'classnames'
import './Modal.css'
interface Props {
  children: JSX.Element;
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  color: string;
  show: boolean;
  close: () => void;
  disableClose?: boolean;
}

type Classes = {
  'modal-backdrop': boolean;
  'modal-backdrop--show'?: boolean;
}

const Modal = ({
  children,
  width,
  height,
  maxHeight,
  minHeight,
  maxWidth,
  minWidth,
  color,
  close,
  show,
  disableClose
}: Props) => {
  const styles = {
    width,
    height,
    maxHeight,
    minHeight,
    maxWidth,
    minWidth,
    backgroundColor: color
  }

  let classes: Classes = {
    'modal-backdrop': true
  }

  if (show) {
    classes['modal-backdrop--show'] = true
  }

  //handle pressing escape key to close modal
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || disableClose) return
    e.preventDefault()
    close()
  })

  const handleClick = () => {
    //disabled click to close modal if disableClose is true
    if (disableClose) return
    close()
  }

  return (
    <div className={cx(classes)} onClick={handleClick}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()} style={styles} data-testid='modal-container'>
        {children}
      </div>
    </div>
  )
}

export default Modal
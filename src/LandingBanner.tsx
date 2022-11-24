import React, { FormEvent, useState } from 'react'
import './LandingBanner.css'
import axios from 'axios'
import Modal from './Modal'
import SendButton, { SendStates } from './SendButton'

type InputContent = {
  value: string;
  error?: string;
}

type Inputs = {
  fullName: InputContent;
  email: InputContent;
  confirmEmail: InputContent;
}
function LandingBanner() {

  const [show, setShow] = useState(false)
  const [buttonState, setButtonState] = useState<number>(0)
  const [mainError, setMainError] = useState<string>('')
  const [successful, setSuccessful] = useState<boolean>(false)
  const [inputs, setInputs] = useState<Inputs>({
    fullName: {
      value: '',
      error: ''
    },
    email: {
      value: '',
      error: ''
    },
    confirmEmail: {
      value: '',
      error: ''
    }
  })

  //bind the input value to the inputs state
  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputs({
      ...inputs,
      [e.currentTarget.name]: {
        ...[e.currentTarget.name],
        value
      }
    })
  }

  //check all required fields
  const requiredFieldChecks = (): number => {
    let failed = 0
    for (let [key, { value }] of Object.entries(inputs)) {
      if (value.length === 0) {
        setInputs((prev) => {
          return {
            ...prev,
            [key]: {
              ...inputs[key as keyof Inputs],
              error: 'This field is required'
            }
          }
        })
        failed++
      }
    }
    return failed
  }

  const validationChecks = (): boolean => {
    if (requiredFieldChecks() >= 1) return false

    //check confirm email matches email
    if (inputs.email.value !== inputs.confirmEmail.value) {
      setInputs({
        ...inputs,
        confirmEmail: {
          ...inputs.confirmEmail,
          error: 'Confirm email must match email.'
        }
      })
      return false
    }

    //check if full name is less than 3 characters
    if (inputs.fullName.value.length < 3) {
      setInputs({
        ...inputs,
        fullName: {
          ...inputs.fullName,
          error: 'Full Name must be at least 3 characters.'
        }
      })
      return false
    }

    return true
  }

  const handleClick = () => {

    //run validation checks
    if (!validationChecks()) return

    setButtonState(SendStates.Sending)

    axios.post(
      'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth',
      { name: inputs.fullName.value, email: inputs.email.value },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response?.status === 200) {
          setButtonState(SendStates.Sent)
          setTimeout(() => {
            setButtonState(SendStates.Neutral)
            setSuccessful(true)
          }, 2000);
        }
      })
      .catch(({ response }) => {
        if (response?.status === 400) {
          const { errorMessage } = response.data
          if (!errorMessage) return

          setMainError(errorMessage)
          setButtonState(SendStates.Neutral)
        }
      })
  }

  const resetRequest = () => {
    Object.keys(inputs).forEach((key) => {
      setInputs((prev) => ({
        ...prev,
        [key]: {
          error: '',
          value: ''
        }
      }))
    })
    setSuccessful(false)
    setShow(false)
  }

  const form = <form onSubmit={(e) => e.preventDefault()} className='d-flex d-flex--column h-100'>
    <div className="flex-1">
      <div className={`text-field mt-3 ${inputs.fullName.value ? 'text-field--filled' : ''}`}>
        <div className="text-field__container">
          <input type="text" value={inputs.fullName.value} onInput={handleInput} id='full-name' placeholder='Full Name' name='fullName' />
          <label htmlFor="full-name">Full Name</label>
        </div>
        <p className={`text-field__error ${inputs.fullName.error ? 'text-field__error--show' : ''}`}>{inputs.fullName.error}</p>
      </div>

      <div className={`text-field mt-3 ${inputs.email.value ? 'text-field--filled' : ''}`}>
        <div className="text-field__container">
          <input type="email" value={inputs.email.value} onInput={handleInput} id="email" placeholder='Email' name='email' />
          <label htmlFor="email">Email</label>
        </div>
        <p className={`text-field__error ${inputs.email.error ? 'text-field__error--show' : ''}`}>{inputs.email.error}</p>
      </div>

      <div className={`text-field mt-3 ${inputs.confirmEmail.value ? 'text-field--filled' : ''}`}>
        <div className="text-field__container">
          <input type="email" id="confirm-email" onInput={handleInput} value={inputs.confirmEmail.value} placeholder='Confirm Email' name='confirmEmail' />
          <label htmlFor="confirm-email">Confirm Email</label>
        </div>
        <p className={`text-field__error ${inputs.confirmEmail.error ? 'text-field__error--show' : ''}`}>{inputs.confirmEmail.error}</p>
      </div>

    </div>
    <SendButton disabled={buttonState === SendStates.Sending ? true : false} click={handleClick} state={buttonState} />
  </form>

  const success = <div className='d-flex d-flex--column h-100 justify-center'>
    <p className='text--lg text--center'>Thank you for requesting an invite! We will send you that latest news and updates to your email.</p>
    <button className='button button--primary' onClick={() => resetRequest()}>Okay</button>
  </div>

  const modalHead = <>
    <div className='modal-container__header'>Request an Invite</div>
    <hr />
    <p className={`error ${mainError ? 'error--show' : ''}`}>{mainError}</p>
  </>

  return (
    <section className='landing-banner'>
      <div className='landing-banner_content'>
        <h1 data-testid="banner-title">Be the first to receive exclusive offers and discounts.</h1>
        <button className='button' onClick={() => setShow(true)}>Join Now</button>
        <Modal
          width="80%"
          height='80%'
          maxWidth='450px'
          color='#FFFFFF'
          show={show}
          close={() => resetRequest()}
          maxHeight='600px'
        >
          <>
            {successful ? '' : modalHead}
            <div className='modal-container__content'>
              {successful ? success : form}
            </div>
          </>
        </Modal>
      </div>
    </section>
  )
}

export default LandingBanner
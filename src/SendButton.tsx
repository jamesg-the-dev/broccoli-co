import Send from './assets/send.svg'
import "./SendButton.css";

export enum SendStates {
  Neutral,
  Sending,
  Sent
}

type Props = {
  state: number;
  click?: () => void;
  disabled?: boolean
}

const SendButton = ({
  state,
  click,
  disabled
}: Props) => {
  const states = ['Send Message', 'Sending ...', 'Sent']

  return (
    <button
      data-testid="send-button"
      onClick={click}
      disabled={disabled}
      className={`send-button button button--primary send-button--state-${state}`}
    >
      <img src={Send} alt="Send Icon" className="icon" />
      <span className="text">{states[state]}</span>
    </button>
  );
};

export default SendButton
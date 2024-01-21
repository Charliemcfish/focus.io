import './styles.scss';
import Digit from '../Digit';

export interface ITimerStyledProps {
    seconds: number;
    minutes: number;
    hours: number;
}

const TimerStyled = ({ seconds, minutes, hours }: ITimerStyledProps) => {
return (
<div className='timerContainer'>
<Digit value={hours} title='HOURS'  /> 
<span className='seperatorContainer'>
<span className='separator' /> 
<span className='separator' /> 
</span>
<Digit value={minutes} title='MINUTES' addSeperator />
<span className='seperatorContainer'>
<span className='separator' /> 
<span className='separator' /> 
</span>
<Digit value={seconds} title='SECONDS'/>

</div>

);
};

export default TimerStyled;
function CounterTab(props) {
    let minez = props.data.value - props.tafazol
    return minez <= 0 ? 1 : minez
} 
export default CounterTab
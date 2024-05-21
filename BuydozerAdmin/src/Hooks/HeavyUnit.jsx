const HookHeavyUnit = (props) => {
    const HeavyUnit = `https://localhost:5001/api/HeavyUnits/`
    const Get = `GetHeavyUnit?ParameterUnit=%25${props.SearchValue}%25&PriceBuy=${props.BuySort}&PageNumber=${props.PageNumber}&PageSize=${props.PageSize}`
}

export default HookHeavyUnit
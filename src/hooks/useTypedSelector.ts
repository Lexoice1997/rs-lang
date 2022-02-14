import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ReducerAppType } from "../redux/store";


export const useTypedSelector: TypedUseSelectorHook<ReducerAppType> = useSelector;
import HEle, { Component, Context } from "hele";
import * as HBus from "hbus";

export const defaultBusName = 'hele-hbus-bus';

export type BusNameIndex = string | symbol | number;

export interface BusProps<S = any, T = any, P = any> {
    processor: HBus.Processor<S, HBus.Action<T, P>>;
    defaultState?: S;
    name?: BusNameIndex;
    children: any;
}

export class Bus<S = any, T = any, P = any> extends Component<BusProps<S, T, P>> {

    constructor(props: BusProps<S, T, P>, context: any) {
        super(props, context);
        this.bus = new HBus.Bus(props.processor, props.defaultState);
        this.name = props.name === undefined ? defaultBusName : props.name;
    }

    readonly bus: HBus.Bus<S, T, P>;
    readonly name: BusNameIndex;

    render() {
        return (
            <Context value={{ [this.name]: this.bus }}>
                {this.props.children}
            </Context>
        );
    }

}

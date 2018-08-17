import { Component } from "hele";
import * as HBus from "hbus";
import { BusNameIndex, defaultBusName } from "./Bus";

export type SubscriptionProps<S = any, P extends keyof S = any> = {
    bus?: BusNameIndex;
    children: (state: S) => any;
} | {
    bus?: BusNameIndex;
    prop: P;
    children: (prop: S[P]) => any;
}

export class Subscription<S = any, P extends keyof S = any> extends Component<SubscriptionProps<S, P>> {

    constructor(props: SubscriptionProps<S, P>, context: any) {
        super(props, context);

        const bus = this.bus = context[props.bus === undefined ? defaultBusName : props.bus] as HBus.Bus<S>,
            state = bus.getState();
        this.state = 'prop' in props ? state[props.prop] : state;

        this.subscriber = this.update.bind(this);

    }

    readonly bus: HBus.Bus<S>;
    readonly subscriber: any;

    onWillMount() {
        const { props, bus, subscriber } = this;
        if ('prop' in props) {
            bus.subscribeProp(props.prop, subscriber);
        } else {
            bus.subscribe(subscriber);
        }
    }

    render() {
        return this.props.children[0](this.state);
    }

    onWillUnmount() {
        const { props, bus, subscriber } = this;
        if ('prop' in props) {
            bus.unsubscribeProp(props.prop, subscriber);
        } else {
            bus.unsubscribe(subscriber);
        }
    }

}

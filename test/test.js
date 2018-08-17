const { Bus, Subscription, createElement: h, Reference } = HEle,
    busRef = new Reference(),
    setAction = HBus.createActionFactory('SET');

HEle.render(
    h(
        Bus, {
            processor(state, action) {
                const { type } = action;
                if (type === 'INC') {
                    state.count++;
                } else if (type === 'RESET') {
                    state.count = 0;
                } else if (type === 'SET') {
                    state.count = action.payload;
                } else {
                    console.warn(`Unknown action type: "${type}"!`);
                }
            },
            defaultState: {
                count: 0
            },
            ref: busRef
        }, [
            h(
                Subscription,
                null,
                state => h('p', null, JSON.stringify(state))
            ),
            h(
                Subscription,
                { prop: 'count' },
                count => h('p', null, `state.count: ${count}`)
            ),
            h(
                'button',
                {
                    onclick() {
                        busRef.current.bus.publish({
                            type: 'INC'
                        });
                    }
                },
                'INC'
            ),
            h('br'),
            h(
                'button',
                {
                    onclick() {
                        const { bus } = busRef.current;
                        let count = prompt('Set', bus.getState().count);
                        if (count !== null) {
                            bus.publish(setAction(+count));
                        }
                    }
                },
                'SET'
            ),
            h('br'),
            h(
                'button',
                {
                    onclick() {
                        busRef.current.bus.publish({
                            type: 'RESET'
                        });
                    }
                },
                'RESET'
            )
        ]
    ),
    document.getElementById('root')
);

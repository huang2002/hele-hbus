# hele-hbus

HEle bindings for HBus.

# Example

```jsx
const { Bus, Subscription } = HEle, // exported components
    busName = 'bus'; // default: HEle.defaultBusName

class PublishButton extends HEle.Component {
    constructor(props, context) {
        super(props, context);
        this.publish = this.publish.bind(this);
    }
    publish() {
        const { [busName]: bus } = this.context;
        bus.publish(new HBus.Action('ACTION_TYPE', PAYLOAD));
    }
    render() {
        return <button onclick={this.publish}>Publish an action</button>;
    }
}

HEle.render(
    <Bus name={busName} processor={PROCESSOR} defaultState={DEFAULT_STATE}>
        <Subscription bus={busName}>
            {state => (
                <p>Current state: {state}</p>
            )}
        </Subscription>
        <Subscription bus={busName} prop="PROP_NAME">
            {prop => (
                <p>Current prop: {prop}</p>
            )}
        </Subscription>
        <PublishButton />
    </Bus>,
    document.getElementById('root')
);
```

# APIs

The example above has shown how to use this lib. If you want the detailed API reference, please read the source files in `src` or the type declaration files in `typings`.

# Changelog

See [CHANGELOG.md](CHANGELOG.md)
